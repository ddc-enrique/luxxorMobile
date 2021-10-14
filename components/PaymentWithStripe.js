import React,  { useState} from "react"
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { Text, StyleSheet, Button, View } from "react-native";
import shopCartAction from "../redux/actions/shopCartActions";
import { connect } from "react-redux";

const PaymentWithStripe = (props) => {
    const [card, setCard] = useState(null)
    const stripe = useStripe()  

    const handlePayPress = async () => {
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "Card",
            card: card
        })
        if(!error){
            const {id} = paymentMethod
            props.payCart({
                id,
                amount: (props.total*100)/186
            }).then(response => {console.log(response)
                    props.setPayment("Tarjeta de crédito")
                    props.setScreen(3)
            }).catch((e)=> console.log(e))
        }
    }

    return (
        <View>
            <CardField 
                postalCodeEnabled={false}
                placeholder={{
                number: "4242 4242 4242 4242",
                }}
                    cardStyle={styles.card}
                    style={styles.cardContainer}
                    onCardChange={(cardDetails) => {
                    setCard(cardDetails);
                }}
            />
            <Button
                onPress={handlePayPress}
                title="Pagar"
            />
        </View>
    )
}
const mapDispatchToProps = {
    payCart: shopCartAction.payCart,
}

const mapStateToProps = (state) => {
    return{
        total: state.shopCart.total
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWithStripe)

const styles = StyleSheet.create({
    cardContainer: {
        height: 50,
        width: 300,
        marginVertical: 30,
    }
})