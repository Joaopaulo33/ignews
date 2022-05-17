import { NextApiResponse,NextApiRequest} from 'next';
import { Readable} from 'stream'
import Stripe from "stripe"
import { stripe } from '../../services/stripe'


async function buffer(readable:Readable){
    const chunks = [];

    for await(const chunk of readable){
        chunks.push(
            typeof chunk == 'string'? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks);
}
export const config={
    api:{
        bodyParser:false
    }
}


const relevantEvents = new Set([
    'checkout.session.completed'
])

export default async(req:NextApiRequest, res:NextApiResponse)=>{

    const buf = await buffer(req)
    const secret = req.headers['stripe-signature']

    let event : Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    }catch(err){
        return res.status(400).send(`Webhook error: ${err.message}`)
    }

    res.status(200).json({ok: true});


}