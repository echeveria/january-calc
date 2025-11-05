import { type ChangeEvent, useEffect, useState } from "react";
import * as React from "react";

const exchangeRate = 1.95583;
type TCurrency = "BGN" | "EUR";

interface IPayment {
    price: number;
    priceCurrency: TCurrency;
    cash: number;
    cashCurrency: TCurrency;
}

interface ICashBack {
    BGN: number;
    EUR: number;
}

const defaultPayment: IPayment = {
    price: 0.0,
    priceCurrency: "BGN",
    cash: 0.0,
    cashCurrency: "BGN",
};

const defaultCashBack: ICashBack = { BGN: 0.0, EUR: 0.0 };

function App() {
    const [payment, setPayment] = useState<IPayment>(defaultPayment);
    const [cashBack, setCashBack] = useState<ICashBack>(defaultCashBack);
    const [hasSelected, setHasSelected] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!hasSelected) {
            e.target.select();
            setHasSelected(true);
        }
    };

    const handleBlur = () => {
        setHasSelected(false);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        setPayment((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const priceBGN =
            payment.priceCurrency === "EUR" ? payment.price * exchangeRate : payment.price;
        const cashBGN = payment.cashCurrency === "EUR" ? payment.cash * exchangeRate : payment.cash;

        const changeBGN = cashBGN - priceBGN;
        const changeEUR = changeBGN / exchangeRate;

        setCashBack({ BGN: changeBGN, EUR: changeEUR });
    }, [payment]);

    const isChanged = JSON.stringify(cashBack) !== JSON.stringify(defaultCashBack);

    return (
        <div className="relative mx-auto mt-6 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
            {isChanged && (
                <button
                    className="absolute top-2 right-2 rounded-2xl border border-gray-200 bg-white px-3 py-1 shadow-md"
                    type="reset"
                    onClick={() => {
                        setPayment(defaultPayment);
                        setCashBack(defaultCashBack);
                    }}
                >
                    Изчисти
                </button>
            )}
            <h1 className="mt-8 mb-4 text-center text-lg font-semibold text-gray-800">
                Януарски калкулатор
            </h1>
            <div className="m-4">
                <div className="mt-2">
                    <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                        Цена
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <input
                                id="price"
                                name="price"
                                placeholder="0.00"
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                type="number"
                                step="0.01"
                                value={payment.price}
                                onChange={onChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                <select
                                    id="priceCurrency"
                                    name="priceCurrency"
                                    aria-label="priceCurrenc"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={payment.priceCurrency}
                                    onChange={onChange}
                                >
                                    <option value="BGN">BGN</option>
                                    <option value="EUR">EUR</option>
                                </select>
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    data-slot="icon"
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                >
                                    <path
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="price"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            В брой
                        </label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <input
                                    id="price"
                                    name="cash"
                                    placeholder="0.00"
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    type="number"
                                    step="0.01"
                                    value={payment.cash}
                                    onChange={onChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="cashCurrency"
                                        name="cashCurrency"
                                        aria-label="cashCurrency"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={payment.cashCurrency}
                                        onChange={onChange}
                                    >
                                        <option value="BGN">BGN</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                    <svg
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        data-slot="icon"
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    >
                                        <path
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mb-3 text-center text-lg font-semibold text-gray-800">Ресто</h2>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-xl bg-yellow-50 px-4 py-3 shadow-sm">
                    <span className="font-medium text-gray-600">Лева (BGN)</span>
                    <span className="text-lg font-bold text-yellow-700">
                        {cashBack.BGN.toFixed(2)} лв
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 shadow-sm">
                    <span className="font-medium text-gray-600">Евро (EUR)</span>
                    <span className="text-lg font-bold text-blue-700">
                        {cashBack.EUR.toFixed(2)} €
                    </span>
                </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
                * Изчислено курс: {exchangeRate} лева за 1 евро
            </p>
        </div>
    );
}

export default App;
