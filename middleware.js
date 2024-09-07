import { NextResponse } from 'next/server';
export async function middleware(req) {
    const response = NextResponse.next();
    // Configura las cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*'); // Cambia esto si es necesario
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type');
    // Manejo de la solicitud OPTIONS
    if (req.method === 'OPTIONS') {
        return response;
    }
    return response;
}
export const config = {
    matcher: ['/api/:path*'],
};