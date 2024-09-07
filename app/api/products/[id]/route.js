import { NextResponse } from "next/server";
import { pool } from '@/libs/serverlessmysql';

export async function GET(request, { params }) {
    try {
        const productID = params.id;
        const result = await pool.query("SELECT * FROM products WHERE ProductID = ?", [productID]);
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Products no encontrado",
                },
                {
                    status: 404,
                }
            );

        };
        return NextResponse.json(result[0]);
    } catch (error) {
        console.log('Erroro al buscar un Products');
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
export async function PUT(request, { params }) {

    try {
        const productID = params.id;
        const data = await request.json();
        const result = await pool.query("UPDATE products SET ? WHERE ProductID = ?", [data, productID]);
        if (result.affectedRows === 0)
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 404,
                }
            );
        const resultProduct = await pool.query("SELECT * FROM products WHERE ProductID = ?", [productID]);
        return NextResponse.json(resultProduct[0]);

    } catch (error) {
        console.log('Error al Actualizar los productos');
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
export async function DELETE(request, { params }) {
    try {
        const productID = params.id;
        const result = await pool.query("DELETE FROM products WHERE ProductID = ?", [productID]);
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Products con " + productID + " no encontrado",
                },
                {
                    status: 404,
                }
            );

        };
        return NextResponse.json("Eliminado correctamente el ProductID: " + productID);
    } catch (error) {
        console.log('Error al listar los products');
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}