import Problems from "../models/Problems";

export async function reportAProblemForTicker(ticker: string, message: string) {

    const problem = new Problems({
        ticker,
        problem: message
    });

    await problem.save();
}

