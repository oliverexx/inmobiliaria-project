"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { Calculator, DollarSign, Percent, Clock } from "lucide-react";

interface MortgageCalculatorProps {
    propertyPrice: number;
    currency?: string;
}

export default function MortgageCalculator({
    propertyPrice,
    currency = "USD",
}: MortgageCalculatorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [downPaymentPct, setDownPaymentPct] = useState(20);
    const [interestRate, setInterestRate] = useState(7.5);
    const [termYears, setTermYears] = useState(20);

    const result = useMemo(() => {
        const downPayment = (propertyPrice * downPaymentPct) / 100;
        const principal = propertyPrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const totalPayments = termYears * 12;

        if (monthlyRate === 0) {
            return {
                monthlyPayment: principal / totalPayments,
                totalPayment: principal,
                totalInterest: 0,
                principal,
                downPayment,
            };
        }

        const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
            (Math.pow(1 + monthlyRate, totalPayments) - 1);

        const totalPayment = monthlyPayment * totalPayments;
        const totalInterest = totalPayment - principal;

        return {
            monthlyPayment,
            totalPayment,
            totalInterest,
            principal,
            downPayment,
        };
    }, [propertyPrice, downPaymentPct, interestRate, termYears]);

    const formatMoney = (amount: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    <Calculator className="w-4 h-4 text-amber-500" />
                    Calculadora hipotecaria
                </span>
                <span
                    className={clsx(
                        "text-gray-400 transition-transform duration-200 text-lg",
                        isOpen && "rotate-180"
                    )}
                >
                    ▾
                </span>
            </button>

            {isOpen && (
                <div className="px-4 pb-5 space-y-4 border-t border-gray-100 pt-4 animate-fadeInUp" style={{ animationDelay: "0s" }}>
                    {/* Down Payment */}
                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1.5">
                            <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                Anticipo
                            </span>
                            <span className="text-amber-600 font-bold">
                                {downPaymentPct}% — {formatMoney(result.downPayment)}
                            </span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={80}
                            step={5}
                            value={downPaymentPct}
                            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1.5">
                            <span className="flex items-center gap-1">
                                <Percent className="w-3 h-3" />
                                Tasa anual
                            </span>
                            <span className="text-amber-600 font-bold">{interestRate}%</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={20}
                            step={0.5}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>

                    {/* Term */}
                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1.5">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Plazo
                            </span>
                            <span className="text-amber-600 font-bold">{termYears} años</span>
                        </label>
                        <input
                            type="range"
                            min={5}
                            max={30}
                            step={5}
                            value={termYears}
                            onChange={(e) => setTermYears(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>

                    {/* Result */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                        <p className="text-xs text-amber-700 mb-1">Cuota mensual estimada</p>
                        <p className="text-2xl font-bold text-amber-700">
                            {formatMoney(result.monthlyPayment)}
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Financiado</p>
                            <p className="text-sm font-bold text-gray-800">
                                {formatMoney(result.principal)}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Interés total</p>
                            <p className="text-sm font-bold text-gray-800">
                                {formatMoney(result.totalInterest)}
                            </p>
                        </div>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center">
                        * Valores estimativos. No constituye oferta de crédito.
                    </p>
                </div>
            )}
        </div>
    );
}
