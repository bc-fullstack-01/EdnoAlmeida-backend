import { Router, Request, Response } from 'express'
import EmailService from './services/EmailService';

const users = [
    { name: 'Edno Almeida', email: 'edno@hotmail.com.br' },
];

async function index(req: Request, res: Response) {
    return res.json(users);
}


async function friends(req: Request, res: Response) {
    const friedn_names = [
        { name: ['Diego', 'nava', 'sara', 'pier', 'carlos', 'weyder'] },
    ];

    return res.json(friedn_names);
}

async function create(req: Request, res: Response) {
    const emailService = new EmailService();
    console.log('teste de docker')

    emailService.sendMail({
        to: {
            name: 'Edno Almeida',
            email: 'edno@hotmail.com.br'
        },
        message: {
            subject: 'Bem-vindo ao sistema',
            body: 'Seja bem-vindo'
        }
    });

    return res.send();
}

const routes = Router()

routes.get('/user', index)
routes.get('/friends', friends)
routes.post('/users', create)

export default routes