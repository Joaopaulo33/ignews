import styles from './styles.module.scss';
import {useSession,signIn} from 'next-auth/react'

interface SubscribeButtonProps{
    priceId:string;
}

export function handleSubscribe(){
    const session = useSession();
    if(!session){
        signIn('github')
        return;
    }
    //Criação da checkoutSession
    
}

export function SubscribeButton({ priceId }:SubscribeButtonProps){
    return(
        <button 
        type="button"
        className={styles.subscribeButton}
        >
            Subscribe now
            
        </button>
    )
}