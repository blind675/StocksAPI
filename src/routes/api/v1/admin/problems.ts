import {Router, Request, Response} from "express";
import ProblemsModel, {Problems} from "../../../../models/Problems";

const router = Router();

function mapProblemToResponse(problem: Problems) {
    return {
        id: problem._id,
        ticker: problem.ticker,
        message: problem.problem
    }
}

router.get('/', async (request: Request, response: Response) => {

    const problems = await ProblemsModel.find({})
    const problemsResponse = problems.map(mapProblemToResponse);

    response.json(problemsResponse)
});

export const problemsRoutes = router;
