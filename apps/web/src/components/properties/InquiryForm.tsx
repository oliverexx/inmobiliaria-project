"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface InquiryFormProps {
    propertyId: number;
    propertyTitle: string;
    operation: string;
    rentalPrices?: {
        daily?: number;
        weekly?: number;
        monthly?: number;
        longTerm?: number;
    } | null;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function InquiryForm({
    propertyId,
    propertyTitle,
    operation,
    rentalPrices,
}: InquiryFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState(
        `Hola, me interesa la propiedad "${propertyTitle}". ¿Podrían brindarme más información?`
    );
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    propertyId,
                    clientName: name,
                    clientEmail: email,
                    clientPhone: phone,
                    message,
                }),
            });

            if (res.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setPhone("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-semibold">¡Consulta enviada!</p>
                <p className="text-green-600 text-sm mt-1">
                    Nos pondremos en contacto a la brevedad.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-green-700 underline"
                >
                    Enviar otra consulta
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Consultar por esta propiedad
            </h4>

            {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Error al enviar. Intentá de nuevo.
                </div>
            )}

            <input
                type="text"
                placeholder="Nombre completo *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={clsx(
                    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400",
                    "placeholder:text-gray-400"
                )}
            />
            <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={clsx(
                    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400",
                    "placeholder:text-gray-400"
                )}
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={clsx(
                    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400",
                    "placeholder:text-gray-400"
                )}
            />
            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setMessage(`Hola, me interesa la propiedad "${propertyTitle}". ¿Podrían brindarme más información?`);
                    }}
                    className={clsx(
                        "px-3 py-2 text-xs font-medium rounded-lg border transition-colors",
                        !message.toLowerCase().includes("visita")
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
                    )}
                >
                    Consulta
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setMessage(`Hola, me gustaría agendar una visita para ver la propiedad "${propertyTitle}". ¿Qué días tienen disponibilidad?`);
                    }}
                    className={clsx(
                        "px-3 py-2 text-xs font-medium rounded-lg border transition-colors",
                        message.toLowerCase().includes("visita")
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
                    )}
                >
                    Agendar Visita
                </button>
            </div>

            {/* Rental Type Selection */}
            {operation === "rent" && rentalPrices && (
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Estadía preferida
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(rentalPrices).map(([key, value]) => {
                            if (!value) return null;
                            const label = key === "daily" ? "Día" :
                                key === "weekly" ? "Semana" :
                                    key === "monthly" ? "Mes" :
                                        "Contrato";
                            const periodLabel = key === "daily" ? "por día" :
                                key === "weekly" ? "por semana" :
                                    key === "monthly" ? "por mes" :
                                        "de contrato largo";
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => {
                                        setMessage(`Hola, me interesa el alquiler ${periodLabel} de la propiedad "${propertyTitle}". ¿Tienen disponibilidad?`);
                                    }}
                                    className={clsx(
                                        "px-2 py-1.5 text-[10px] font-bold uppercase rounded-lg border transition-colors",
                                        message.includes(periodLabel)
                                            ? "bg-amber-50 border-amber-200 text-amber-700"
                                            : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50"
                                    )}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <textarea
                placeholder="Mensaje *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className={clsx(
                    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none text-gray-900",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400",
                    "placeholder:text-gray-400"
                )}
            />

            <button
                type="submit"
                disabled={status === "loading"}
                className={clsx(
                    "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                    status === "loading"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                )}
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Enviar consulta
                    </>
                )}
            </button>
        </form>
    );
}
