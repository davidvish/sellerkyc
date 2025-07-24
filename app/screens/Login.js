import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { completeKyc, loginAction, updateKyc } from '../redux/action/AuthAction';
import { kycAction } from '../redux/action/KycAction';
import KycModal from '../components/KycModal';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [pan, setPan] = useState('ABCDE1234F');
  const [gst, setGst] = useState('22ABCDE1234F1Z5');
  const [bank, setBank] = useState('ICICI - 1234567890');
  const [kyc, setKyc] = useState(false);
  const [shopImages, setShopImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isKycModalVisible, setKycModalVisible] = useState(false);

  const validateMobile = () => /^\d{10}$/.test(mobile);
  const validatePan = () => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const validateGst = () => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  const validateBank = () => bank.length > 5;

  const handleSendOtp = () => {
    if (!validateMobile()) {
      setErrors({ mobile: 'Enter valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setOtpSent(true);
    Alert.alert('OTP Sent', 'A one-time password has been sent to your mobile.');
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Enter valid 6-digit OTP' });
      return;
    }
    setErrors({});
    setKyc(true);
    Alert.alert('OTP Verified', 'OTP verified successfully.');
  };

const handleLogin = () => {
  setKycModalVisible(false);

  setTimeout(() => {
    dispatch(loginAction(mobile));
    navigation.reset({
      index: 0,
      routes: [{ name: 'DashboardTabs' }],
    });
  }, 100); // delay avoids race condition
};


  const handleSubmit = () => {
    let newErrors = {};
    if (!validatePan()) newErrors.pan = 'Invalid PAN format';
    if (!validateGst()) newErrors.gst = 'Invalid GST format';
    if (!validateBank()) newErrors.bank = 'Enter valid bank details';
    if (shopImages.length === 0) newErrors.shopImages = 'Upload at least one shop image';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
          dispatch(kycAction({
            pan: pan,
            gst: gst,
            bank: bank,
            shopImages: shopImages,
          }));
          setKycModalVisible(true);
  };

  const handlePickImage = () => {
  launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 1,
    },
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setShopImages([...shopImages, uri]);
      }
    }
  );
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {!otpSent || !kyc ? (
        <>
          {!otpSent && (
            <>
            <Text style={styles.title}>Sign-Up</Text>

              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                maxLength={10}
              />
              {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {otpSent && !kyc && (
            <>
      <Text style={styles.title}>OTP Verification</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
              />
              {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
     <Text style={styles.title}>KYC Details</Text>
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
            value={pan}
            onChangeText={setPan}
            autoCapitalize="characters"
            maxLength={10}
          />
          {errors.pan && <Text style={styles.error}>{errors.pan}</Text>}

          <TextInput
            style={styles.input}
            placeholder="GST Number"
            value={gst}
            onChangeText={setGst}
            autoCapitalize="characters"
            maxLength={15}
          />
          {errors.gst && <Text style={styles.error}>{errors.gst}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Bank Details (Account No, IFSC)"
            value={bank}
            onChangeText={setBank}
          />
          {errors.bank && <Text style={styles.error}>{errors.bank}</Text>}

          <View style={styles.imageSection}>
            <Text style={styles.label}>Shop Images</Text>
            <View style={styles.imageRow}>
              {shopImages.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.shopImage} />
              ))}
              <TouchableOpacity style={styles.addImage} onPress={handlePickImage}>
                <Text style={styles.addImageText}>+</Text>
              </TouchableOpacity>
            </View>
            {errors.shopImages && <Text style={styles.error}>{errors.shopImages}</Text>}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit KYC</Text>
          </TouchableOpacity>
        </>
      )}

      <KycModal
          isVisible={isKycModalVisible}
          onClose={() => setKycModalVisible(false)}
          onOk={handleLogin}
        />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  error: {
    color: '#FF3B30',
    marginBottom: 8,
    fontSize: 13,
    paddingLeft: 4,
  },
  imageSection: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    color: '#444',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  shopImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
  },
  addImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginBottom: 10,
  },
  addImageText: {
    fontSize: 30,
    color: '#999',
  },
});
