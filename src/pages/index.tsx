import { GetStaticProps } from 'next';
import Head from 'next/head';
import {stripe} from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss'

interface HomeProps{
    product:{
        priceId:string;
        amount: number;
    }
}

export default function Home({product}:HomeProps){
    return(
        <>
            <Head>
                <title>Home | ig.news</title>
            </Head>

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span> Hey, welcome</span>
                    <h1>News about the <span> React </span> world</h1>
                    <p>Get acess to all the publications <br />
                     <span>for {product.amount} month</span>
                    </p>
                    <SubscribeButton priceId={product.priceId}/>
                </section>
                <img src="/images/avatar.svg" alt="Girl coding" />
            </main>
        </>
    )


}
// Aqui está rodando no servidor next  
export const getStaticProps: GetStaticProps = async ()=> {
    //Como estamos usando o stripe aqui, é só dar um pornto para ver as funções disponíveis 
    //retrive quer dizer que será só um
    const price = await stripe.prices.retrieve('price_1KiHQoFCWcZ6E7n9fKwSLt4c',{
        //Faz isso pois o price do produto vem com o id do produto, mas queremos outras informações também(mas nem vamos usar, ele removeu)
        expand:['product']
    })
 
    const product = {
        priceId: price.id,
        //valor unitário(vem sempre em centavos)
        amount: new Intl.NumberFormat('en-US',{
            style:'currency',
            currency:'USD',
        }).format(price.unit_amount/100),
    }
    //tudo que eu der retorno como propriedade, eu posso acessar lá no componente Home
    return{
        props:{
            product,
        },
        revalidate:60 * 60 * 24, //24 hours
    } 
}