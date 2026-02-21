import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/queries";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { propertyId, clientName, clientEmail, clientPhone, message } = body;

        // Basic validation
        if (!propertyId || !clientEmail || !message) {
            return NextResponse.json(
                { error: "Faltan campos requeridos (propertyId, clientEmail, message)" },
                { status: 400 }
            );
        }

        const inquiry = await createInquiry({
            propertyId,
            clientName: clientName || null,
            clientEmail,
            clientPhone: clientPhone || null,
            message,
        });

        return NextResponse.json(inquiry, { status: 201 });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return NextResponse.json(
            { error: "Error al crear la consulta" },
            { status: 500 }
        );
    }
}
