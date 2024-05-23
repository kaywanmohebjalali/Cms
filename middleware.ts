import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
     const token=request.cookies.get('token');
 
     
    if(request.nextUrl.pathname.startsWith('/teachers') && !token){
        return NextResponse.redirect(new URL('/login', request.url))
      }else if(request.nextUrl.pathname.startsWith('/admins') && !token){
      return NextResponse.redirect(new URL('/login', request.url))
    }else if(request.nextUrl.pathname.startsWith('/courses') && !token){
      return NextResponse.redirect(new URL('/login', request.url))
    }

      return NextResponse.next()
}


export const config = {
    matcher: ['/courses/:path*','/admins/:path*','/teachers/:path*','/dashboard/:path*'],
  }