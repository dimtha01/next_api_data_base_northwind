import { NextResponse } from "next/server";
import { pool } from '@/libs/serverlessmysql';

export async function GET(request, { params }) {
    try {
        const employeeID = params.id;
        const result = await pool.query("SELECT * FROM employees WHERE EmployeeID = ?", [employeeID]);
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "employees no encontrado",
                },
                {
                    status: 404,
                }
            );

        };
        return NextResponse.json(result[0]);
    } catch (error) {
        console.log('Erroro al buscar un employees');
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
        const employeeID = params.id;
        const data = await request.json();
        const result = await pool.query("UPDATE employees SET ? WHERE EmployeeID = ?", [data, employeeID]);
        if (result.affectedRows === 0)
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 404,
                }
            );
        const resultProduct = await pool.query("SELECT * FROM employees WHERE EmployeeID = ?", [employeeID]);
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
        const employeeID = params.id;
        const result = await pool.query("DELETE FROM employees WHERE EmployeeID = ?", [employeeID]);
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "employees con " + employeeID + " no encontrado",
                },
                {
                    status: 404,
                }
            );

        };
        return NextResponse.json("Eliminado correctamente el EmployeeID: " + employeeID);
    } catch (error) {
        console.log('Error al listar los employees');
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