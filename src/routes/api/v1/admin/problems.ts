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

router.delete('/:id', async (request: Request, response: Response) => {
    const {id} = request.params;

    if (!id) {
        response.status(400).send("Please specify an id");
    }
    const res = await ProblemsModel.remove({_id: id});

    if (res.deletedCount === 0) {
        response.status(500).send("Id not in database");
    } else {
        response.status(200).send("ok");
    }
});

export const problemsRoutes = router;
