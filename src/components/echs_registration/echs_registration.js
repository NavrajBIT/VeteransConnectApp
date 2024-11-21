import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { registerUserECHS } from '../../api/echs_registration'
import { PrimaryButton } from '../../subcomponents/button'
import DropdownField from '../../subcomponents/dropdown/dropdown'
import { BoldText, PrimaryText } from '../../subcomponents/text'
import { TextField } from '../../subcomponents/textfield'

export const EchsRegistration = () => {
  const navigation = useNavigation()

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [altMobileNumber, setAltMobileNumber] = useState('')
  const [serviceNumber, setServiceNumber] = useState('')
  const [aadharCardNumber, setaadharCardNumber] = useState('')
  const [panCard, setpanCard] = useState('')
  const [accountNumber, setaccountNumber] = useState('')
  const [tehsil, settehsil] = useState('')
  const [district, setdistrict] = useState('')
  const [village, setvillage] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [pinCode, setpinCode] = useState('')

  const [echsFrontImage, setechsFrontImage] = useState(null)
  const [echsBackImage, setechsBackImage] = useState(null)

  const [serviceType, setserviceType] = useState('')
  const serviceOptions = [
    { label: 'Army', value: 'army' },
    { label: 'Married', value: 'navy' },
    { label: 'Air Force', value: 'airForce' },
  ]

  const [category, setcategory] = useState('')
  const categoryOptions = [
    { label: 'Officer', value: 'officer' },
    { label: 'JCO', value: 'jco' },
    { label: 'OR', value: 'or' },
  ]

  const [alive, setAlive] = useState(false)
  const toggleAliveSwitch = () => setAlive((previousState) => !previousState)

  const [primaryMember, setPrimaryMember] = useState(false)
  const togglePrimarySwitch = () =>
    setPrimaryMember((previousState) => !previousState)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !serviceNumber ||
        !accountNumber ||
        !tehsil ||
        !district ||
        !city ||
        !village ||
        !state ||
        !pinCode ||
        !echsFrontImage ||
        !echsBackImage
      ) {
        setLoading(false)
        throw new Error('Please fill all required fields.')
      } else {
        await registerUserECHS({
          isUpdate: false,
          id: '',
          echsCardFront: echsFrontImage,
          echsCardBack: echsBackImage,
          firstName,
          middleName,
          lastName,
          mobileNumber,
          altMobileNumber,
          isAlive: alive,
          serviceType,
          category,
          serviceNumber,
          accountNumber,
          adharCardNumber: aadharCardNumber,
          panCard,
          primaryMember,
          tehsil,
          district,
          village,
          city,
          state,
          pinCode,
        })
        console.log('ECHS Form submitted')
        setLoading(false)
        navigation.navigate('Layout')
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText
          children={'ECHS Registration'}
          fontSize={20}
          textAlign={'left'}
        />
        <View style={{ paddingTop: 20 }}>
          <TextField
            placeholder={'Enter First Name'}
            value={firstName}
            onChangeText={(e) => setFirstName(e.toString())}
          />
          <TextField
            placeholder={'Enter Middle Name'}
            value={middleName}
            onChangeText={(e) => setMiddleName(e.toString())}
          />
          <TextField
            placeholder={'Enter Last Name'}
            value={lastName}
            onChangeText={(e) => setLastName(e.toString())}
          />
          <TextField
            placeholder={'Enter Mobile Number'}
            value={mobileNumber}
            onChangeText={(e) => setMobileNumber(e.toString())}
          />
          <TextField
            placeholder={'Enter Alternate Mobile Number'}
            value={altMobileNumber}
            onChangeText={(e) => setAltMobileNumber(e.toString())}
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{'Alive'}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleAliveSwitch}
              value={alive}
            />
          </View>
          <DropdownField
            label={'Service Type'}
            options={serviceOptions}
            selectedValue={serviceType}
            onValueChange={setserviceType}
            placeholder='Select Service Type'
          />
          <DropdownField
            label={'Category'}
            options={categoryOptions}
            selectedValue={category}
            onValueChange={setcategory}
            placeholder='Select Category'
          />
          <TextField
            placeholder={'Enter Service Number'}
            value={serviceNumber}
            onChangeText={(e) => setServiceNumber(e.toString())}
          />
          <TextField
            placeholder={'Enter Aadhar Number'}
            value={aadharCardNumber}
            onChangeText={(e) => setaadharCardNumber(e.toString())}
          />
          <TextField
            placeholder={'Enter Pan Card Number'}
            value={panCard}
            onChangeText={(e) => setpanCard(e.toString())}
          />
          <TextField
            placeholder={'Enter Account number'}
            value={accountNumber}
            onChangeText={(e) => setaccountNumber(e.toString())}
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{'Primary Member'}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={togglePrimarySwitch}
              value={primaryMember}
            />
          </View>
          <TextField
            placeholder={'Enter Tehsil'}
            value={tehsil}
            onChangeText={(e) => settehsil(e.toString())}
          />
          <TextField
            placeholder={'Enter District'}
            value={district}
            onChangeText={(e) => setdistrict(e.toString())}
          />
          <TextField
            placeholder={'Enter Village'}
            value={village}
            onChangeText={(e) => setvillage(e.toString())}
          />
          <TextField
            placeholder={'Enter City'}
            value={city}
            onChangeText={(e) => setcity(e.toString())}
          />
          <TextField
            placeholder={'Enter State'}
            value={state}
            onChangeText={(e) => setstate(e.toString())}
          />
          <TextField
            placeholder={'Enter Pin Code'}
            value={pinCode}
            onChangeText={(e) => setpinCode(e.toString())}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
          >
            <PrimaryText children={'Echs Card Front Image'} fontSize={16} />
            {echsFrontImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsFrontImage)
                }}
              >
                <PrimaryText
                  children={'Select Image'}
                  fontSize={16}
                  color={'#9164D8'}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
          >
            <PrimaryText children={'Echs Card Back Image'} fontSize={16} />
            {echsBackImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsBackImage)
                }}
              >
                <PrimaryText
                  children={'Select Image'}
                  fontSize={16}
                  color={'#9164D8'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{ width: Dimensions.get('window').width - 40, paddingTop: 20 }}
        >
          {loading ? (
            <ActivityIndicator size='large' color='#9164D8' />
          ) : (
            <PrimaryButton title={'Submit'} onPress={handleSubmit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  switch: {
    transform: [{ scale: 1.5 }],
  },
})
