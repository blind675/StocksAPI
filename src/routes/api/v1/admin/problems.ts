import {Router, Request, Response} from "express";
import ProblemsModel, {Problems} from "../../../../models/Problems";

const cors = require('cors');

const router = Router();

function mapProblemToResponse(problem: Problems) {
    return {
        id: problem._id,
        ticker: problem.ticker,
        message: problem.problem
    }
}

router.get('/', cors(), async (request: Request, response: Response) => {

    const problems = await ProblemsModel.find({})
    const problemsResponse = problems.map(mapProblemToResponse);

    response.json(problemsResponse)
});

router.delete('/:id', async (request: Request, response: Response) => {
    const {id} = request.params;

    if (!id) {
        response.status(400).send("Please specify an Id");
    }

    try {
        const res = await ProblemsModel.findByIdAndRemove(id);

        if (res) {
            response.status(200).send("ok");
        } else {
            response.status(500).send("Id not found in DB");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).send(error.message);
        }
    }
});

export const problemsRoutes = router;
