import styles from './styles.module.scss';
import {useSession,signIn} from 'next-auth/react'
import {api} from '../../pages/services/api'
import { getStripeJs } from '../../pages/services/stripe-js';

interface SubscribeButtonProps{
    priceId:string;
}



export function SubscribeButton({ priceId }:SubscribeButtonProps){
    const session = useSession();

    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return;
        }
        
        try{
            const response = await  api.post('/subscribe')

             const {sessionId}= response.data;

             const stripe = await getStripeJs()
             stripe.redirectToCheckout({sessionId:sessionId})
        }catch(err){
            alert(err.message);
        }
    }
    return(
        <button 
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe now
            
        </button>
    )
}