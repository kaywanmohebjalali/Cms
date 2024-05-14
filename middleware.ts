import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
     console.log('middleware');
     
    if(request.nextUrl.pathname.startsWith('/courses')){
        // return NextResponse.redirect(new URL('/login', request.url))
    }

      return NextResponse.next()
}


// export const config = {
//     matcher: ['courses/:path*','/teachers/:path*'],
//   }