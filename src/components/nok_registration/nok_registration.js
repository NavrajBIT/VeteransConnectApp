import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { registerUserNOK } from '../../api/nok_registration'
import { PrimaryButton } from '../../subcomponents/button'
import DatePickerField from '../../subcomponents/date_picker_field'
import DropdownField from '../../subcomponents/dropdown/dropdown'
import { BoldText, PrimaryText } from '../../subcomponents/text'
import { TextField } from '../../subcomponents/textfield'

export const NokRegistration = () => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [serviceNumber, setServiceNumber] = useState('')
  const [headuaters, setHeadquaters] = useState('')
  const [rank, setRank] = useState('')
  const [dob, setDOB] = useState('')
  const [enrollmentDate, setEnrollmentDate] = useState('')
  const [dateOfDeath, setdateOfDeath] = useState('')
  const [ppoNUmber, setppoNUmber] = useState('')
  const [bankName, setbankName] = useState('')
  const [accountNumber, setaccountNumber] = useState('')
  const [echsNumber, setechsNumber] = useState('')
  const [nameOfNok, setnameOfNok] = useState('')
  const [dateOfNOK, setdateOfNOK] = useState('')
  const [pensionUID, setpensionUID] = useState('')
  const [aadharCardNumber, setaadharCardNumber] = useState('')
  const [panCard, setpanCard] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [pinCode, setpinCode] = useState('')
  const [PostofficeCode, setPostofficeCode] = useState('')
  const [Domicile, setDomicile] = useState('')

  const [relationShipStatus, setrelationShipStatus] = useState('')
  const relationOptions = [
    { label: 'Unmarried', value: 'unmarried' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
    { label: 'Seperated', value: 'seperated' },
  ]

  const [passedAway, setPassedAway] = useState(false)
  const togglePassedAwaySwitch = () =>
    setPassedAway((previousState) => !previousState)

  const [gallantaryAwards, setGallantaryAwards] = useState(false)
  const toggleGallantaryAwardsSwitch = () =>
    setGallantaryAwards((previousState) => !previousState)

  const [pension, setIsPension] = useState(false)
  const toggleIsPensionSwitch = () =>
    setIsPension((previousState) => !previousState)

  const [aadharFrontImage, setaadharFrontImage] = useState(null)
  const [aadharBackImage, setaadharBackImage] = useState(null)
  const [addressImage, setaddressImage] = useState(null)
  const [panImage, setpanImage] = useState(null)

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    try {
      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !serviceNumber ||
        !rank ||
        !aadharCardNumber ||
        !panCard
      ) {
        throw new Error('Please fill all required fields.')
      } else {
        await registerUserNOK({
          isUpdate: false,
          aadharCardFront: aadharFrontImage,
          addharCardBack: aadharBackImage,
          panCardImage: panImage,
          addressProof: addressImage,
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          serviceNumber: serviceNumber,
          headuaters: headuaters,
          rank: rank,
          dateOfBirth: dob,
          dateOfEnrollment: enrollmentDate,
          dateOfDeath: dateOfDeath,
          isGalantry: gallantaryAwards,
          isPension: pension,
          ppoNo: ppoNUmber,
          bankName: bankName,
          accountNumber: accountNumber,
          echsCardNo: echsNumber,
          nokName: nameOfNok,
          dateOfNok: dateOfNOK,
          relationShip: relationShipStatus,
          adharCardNumber: aadharCardNumber,
          panCard: panCard,
          pensionUID: pensionUID,
          Domicile,
          address,
          city,
          state,
          pinCode,
          PostofficeCode,
        })
      }
      console.log('Form submitted successfully.')
      navigation.navigate('Layout')
    } catch (error) {
      console.log('Error submitting form:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText
          children={'NOK Registration'}
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
            placeholder={'Enter Service Number'}
            value={serviceNumber}
            onChangeText={(e) => setServiceNumber(e.toString())}
          />
          <TextField
            placeholder={'Enter Headquater'}
            value={headuaters}
            onChangeText={(e) => setHeadquaters(e.toString())}
          />
          <TextField
            placeholder={'Enter Rank'}
            value={rank}
            onChangeText={(e) => setRank(e.toString())}
          />

          <DatePickerField
            label={'Date of Birth'}
            value={dob}
            onChange={(date) => setDOB(date)}
            placeholder='Select Date of Birth'
          />
          <DatePickerField
            label={'Date of Enrollment'}
            value={enrollmentDate}
            onChange={(date) => setEnrollmentDate(date)}
            placeholder='Select Date of Enrollment'
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{'Passed Away'}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={togglePassedAwaySwitch}
              value={passedAway}
            />
          </View>
          {passedAway && (
            <DatePickerField
              label={'Date of Death'}
              value={dateOfDeath}
              onChange={(date) => setdateOfDeath(date)}
              placeholder='Select Date of Death'
            />
          )}
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{'Gallantary Awards'}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleGallantaryAwardsSwitch}
              value={gallantaryAwards}
            />
          </View>
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{'Getting Pension'}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleIsPensionSwitch}
              value={pension}
            />
          </View>
          {pension && (
            <View>
              <TextField
                placeholder={'Enter PPO number'}
                value={ppoNUmber}
                onChangeText={(e) => setppoNUmber(e.toString())}
              />
              <TextField
                placeholder={'Enter Bank Name'}
                value={bankName}
                onChangeText={(e) => setbankName(e.toString())}
              />
              <TextField
                placeholder={'Enter Account number'}
                value={accountNumber}
                onChangeText={(e) => setaccountNumber(e.toString())}
              />
              <TextField
                placeholder={'Enter ECHS number'}
                value={echsNumber}
                onChangeText={(e) => setechsNumber(e.toString())}
              />
              <TextField
                placeholder={'Enter pension UID'}
                value={pensionUID}
                onChangeText={(e) => setpensionUID(e.toString())}
              />
            </View>
          )}
          <TextField
            placeholder={'Enter Name of NOK'}
            value={nameOfNok}
            onChangeText={(e) => setnameOfNok(e.toString())}
          />
          <DatePickerField
            label={'Date of NOK'}
            value={dateOfNOK}
            onChange={(date) => setdateOfNOK(date)}
            placeholder='Select Date of NOK'
          />
          <DropdownField
            label={'Relation'}
            options={relationOptions}
            selectedValue={relationShipStatus}
            onValueChange={setrelationShipStatus}
            placeholder='Select RelationShipStatus'
          />
          <TextField
            placeholder={'Enter Name of NOK'}
            value={nameOfNok}
            onChangeText={(e) => setnameOfNok(e.toString())}
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
            placeholder={'Enter Address'}
            value={address}
            onChangeText={(e) => setaddress(e.toString())}
          />
          <TextField
            placeholder={'Enter City'}
            value={city}
            onChangeText={(e) => setcity(e.toString())}
          />
          <TextField
            placeholder={'Enter state'}
            value={state}
            onChangeText={(e) => setstate(e.toString())}
          />
          <TextField
            placeholder={'Enter Pin Code'}
            value={pinCode}
            onChangeText={(e) => setpinCode(e.toString())}
          />
          <TextField
            placeholder={'Enter Post Office Code'}
            value={PostofficeCode}
            onChangeText={(e) => setPostofficeCode(e.toString())}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
          >
            <PrimaryText children={'Aadhar Card Front Image'} fontSize={16} />
            {aadharFrontImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaadharFrontImage)
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
            <PrimaryText children={'Aadhar Card Back Image'} fontSize={16} />
            {aadharBackImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaadharBackImage)
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
            <PrimaryText children={'Address Image'} fontSize={16} />
            {addressImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaddressImage)
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
            <PrimaryText children={'Pan Card Image'} fontSize={16} />
            {panImage !== null ? (
              <PrimaryText children={'Selected'} fontSize={16} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setpanImage)
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
        <View style={{ width: Dimensions.get('window').width - 40 }}>
          <PrimaryButton title={'Submit'} onPress={handleSubmit} />
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
    paddingHorizontal: 20,
  },
  switch: {
    transform: [{ scale: 1.5 }],
  },
})
