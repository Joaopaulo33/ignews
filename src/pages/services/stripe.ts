import Stripe from 'stripe'
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion:'2020-08-27',
        //informações de metadados, não tem muita importância   
        appInfo:{
            name:'Ignews',
            version:'0.1.0',
        },
    }
)