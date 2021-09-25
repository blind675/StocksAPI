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
        response.status(400).json({success: false, message: "Please specify an Id"});
    }

    try {
        const res = await ProblemsModel.findByIdAndRemove(id);

        if (res) {
            response.status(200).json({success: true});
        } else {
            response.status(500).json({success: false, message: "Id not found in DB"});
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).json({success: false, message: error.message});
        }
    }
});

export const problemsRoutes = router;
