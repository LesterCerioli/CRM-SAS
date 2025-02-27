import { error } from "console";
import { NextResponse } from "next/server";
import { Next } from "react-bootstrap/esm/PageItem";

const service = AppointmentServiceContract();

/**
 * Handle POST requests - Create an Appointment
 * Endpoint: POST /api/appointments
 */
export async function POST(req) {
    try {
        const body = await req.json();
        if (!body.organizationId || !body.patientId || !body.userId || !body.dateTime) {
            return NextResponse.json(
                { error: "All required fields must be provided" },
                { status: 400 }
            );
        }
        if (!req.headers.get("Authorization")) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 401 }
            );
        }
        const acceptLanguage = req.headers.get("Accept-Language") || "en-US";
        const id = await service.AppointmentServiceContract.id(body, acceptLanguage);
        return NextResponse.json(
            { message: "Appointment created successfully", id },
            { status: 201 }
        );

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}