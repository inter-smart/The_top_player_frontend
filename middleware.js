const { NextResponse } = require("next/server");

export default function middleware(req) {
  const verifytoken = req.cookies.get("UT");
  let url = req.nextUrl.pathname;
  const FREE_COURSE_ID = process.env.FREE_COURSE_ID;
  const enRestrictedUrl = `/en/user/programs/details/${FREE_COURSE_ID}`;
  const arRestrictedUrl = `/ar/user/programs/details/${FREE_COURSE_ID}`;

  if (verifytoken && url.includes("/auth")) {
    if (url.includes("/ar/auth")) {
      return NextResponse.redirect(`${process.env.webDomain}/ar`);
    } else {
      return NextResponse.redirect(`${process.env.webDomain}/en`);
    }
  }

  if (url.includes("/user") && !verifytoken) {
    if (url.includes("/ar/user")) {
      // return NextResponse.redirect(`${process.env.webDomain}/ar/auth/signup`);
    } else {
      // return NextResponse.redirect(`${process.env.webDomain}/en/auth/signup`);
    }
  }
  if (url === enRestrictedUrl || url === arRestrictedUrl) {
    const isAuthenticated = verifytoken;
    console.log("isAuthenticated", isAuthenticated);
    console.log;
    if (url.includes("/ar/user") && isAuthenticated !== undefined) {
      return NextResponse.redirect(`${process.env.webDomain}/ar`);
    }
    if (url.includes("/en/user") && isAuthenticated !== undefined) {
      return NextResponse.redirect(`${process.env.webDomain}/en`);
    }
  }
}
