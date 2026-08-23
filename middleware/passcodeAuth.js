const crypto = require("crypto");

const COOKIE_NAME = "monster_editor";
const ACCESS_DURATION_SECONDS = 15 * 60;

function getPasscode() {
  return process.env.MONSTER_ADMIN_PASSCODE;
}

function safeEqual(firstValue, secondValue) {
  const first = Buffer.from(String(firstValue || ""));
  const second = Buffer.from(String(secondValue || ""));

  return first.length === second.length && crypto.timingSafeEqual(first, second);
}

function createAccessToken(passcode) {
  const expiresAt = Date.now() + ACCESS_DURATION_SECONDS * 1000;
  const signature = crypto
    .createHmac("sha256", passcode)
    .update(String(expiresAt))
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

function hasValidAccess(req) {
  const passcode = getPasscode();
  if (!passcode) return false;

  const cookies = Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .filter(Boolean)
      .map((cookie) => {
        const separator = cookie.indexOf("=");
        return [
          cookie.slice(0, separator).trim(),
          decodeURIComponent(cookie.slice(separator + 1)),
        ];
      }),
  );
  const [expiresAt, signature] = (cookies[COOKIE_NAME] || "").split(".");

  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) return false;

  const expectedSignature = crypto
    .createHmac("sha256", passcode)
    .update(expiresAt)
    .digest("hex");

  return safeEqual(signature, expectedSignature);
}

function safeReturnPath(value) {
  const path = String(value || "");
  return /^\/inventory\/(?:new|\d+\/update)$/.test(path)
    ? path
    : "/inventory";
}

function renderPasscodePage(res, returnTo, error = null, status = 200) {
  return res.status(status).render("passcode", {
    title: "Editor access",
    returnTo: safeReturnPath(returnTo),
    error,
    isConfigured: Boolean(getPasscode()),
  });
}

function requireEditorAccess(req, res, next) {
  if (hasValidAccess(req)) return next();

  if (req.method !== "GET") {
    return renderPasscodePage(
      res,
      req.originalUrl,
      "Your editor access expired. Enter the passcode and try again.",
      401,
    );
  }

  return renderPasscodePage(res, req.originalUrl);
}

function verifyEditorPasscode(req, res) {
  const passcode = getPasscode();
  const returnTo = safeReturnPath(req.body.returnTo);

  if (!passcode) {
    return renderPasscodePage(res, returnTo, null, 503);
  }

  if (!safeEqual(req.body.passcode, passcode)) {
    return renderPasscodePage(
      res,
      returnTo,
      "That passcode was not correct. Please try again.",
      401,
    );
  }

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${createAccessToken(passcode)}; HttpOnly; SameSite=Strict; Path=/inventory; Max-Age=${ACCESS_DURATION_SECONDS}${secure}`,
  );
  return res.redirect(returnTo);
}

module.exports = { requireEditorAccess, verifyEditorPasscode };
