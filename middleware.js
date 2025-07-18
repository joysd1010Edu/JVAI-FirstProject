import { NextResponse } from "next/server";

export function middleware(request) {

   const token = localStorage.getItem('access');
   const refreshToken = localStorage.getItem('refresh');
    if (!token && !refreshToken) {
        console.error('No access or refresh token found in localStorage');
        return NextResponse.redirect(new URL('/login', request.url));
    }

  return NextResponse.next();
}

export const config = {
    matcher:['/chat','chat/:path*', ]
};  

