import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
     
    // if(request.nextUrl.pathname.startsWith('/teachers')){
    //     return NextResponse.redirect(new URL('/login', request.url))
    //   }else if(request.nextUrl.pathname.startsWith('/admins')){
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

      return NextResponse.next()
}


export const config = {
    matcher: ['/admins/:path*','/teachers/:path*','/login','/register'],
  }