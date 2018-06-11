import { StyleSheet, Dimensions/* , Platform */ } from 'react-native';
import colorData from '../config/color';

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// export const colors = {
//   black: '#1a1917',
//   gray: '#888888',
//   background1: '#B721FF',
//   background2: '#21D4FD',
// };

// viewportDimension either be viewportWidth or viewportHeight
export const wp = (percentage, viewportDimension) => {
  const value = (percentage * viewportDimension) / 100;
  return Math.round(value);
};

// const IS_IOS = Platform.OS === 'ios';

const slideHeight = viewportHeight * 0.70;
const slideWidth = wp(75, viewportWidth);
const itemHorizontalMargin = wp(2, viewportWidth);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + (itemHorizontalMargin * 2);
const entryBorderRadius = 8;

const styles = {
  // BACK BUTTON STYLE
  titleBackButton: StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      marginLeft: wp(3, viewportWidth),
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
  }),

  // TOOLTIP STYLE
  toolTipStyle: StyleSheet.create({
    image: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      // tintColor: 'green',
    },
    text: {
      color: '#bbbbbb',
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 10,
      justifyContent: 'center',
    },
    iconStyle: {
      marginRight: wp(3, viewportWidth),
      marginLeft: 2,
      width: 10,
      height: 10,
      resizeMode: 'contain',
    },
  }),

  // SHARED SCREEN STYLE
  sharedStyles: StyleSheet.create({
    mainContainer: {
      flex: 1,
      // paddingVertical: wp(6, viewportHeight),
      // paddingHorizontal: wp(8, viewportWidth),
    },
    centerItems: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    selfCenterItems: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    seprator: {
      borderBottomColor: '#6e7379',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    redSeprator: {
      borderBottomColor: colorData.warningColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    backgroundImage: {
      flex: 1,
      // resizeMode: 'cover', // or 'stretch'
      width: viewportWidth,
      height: viewportHeight,
    },
    overlayContainer: {
      position: 'absolute',
      top: wp(6, viewportHeight),
      bottom: wp(6, viewportHeight),
      left: wp(6, viewportWidth),
      right: wp(6, viewportWidth),
      alignItems: 'center',
    },
    button: {
      width: 200,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#38C7C2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    linkText: {
      color: '#38C7C2',
      fontWeight: 'bold',
      fontSize: 16,
    },
    linkContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputBox: {
      width: wp(70, viewportWidth),
      height: wp(20, viewportWidth),
      borderRadius: wp(10, viewportWidth),
      paddingHorizontal: wp(6, viewportWidth),
      justifyContent: 'center',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
    inputBlackBackground: {
      width: 250,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#1f1f1f',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
    screenBanner: {
      height: 50,
      width: 500,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    icon: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      marginRight: 6,
    },
    inputBoxWithIcon: {
      borderRadius: 30,
      padding: 16,
      marginHorizontal: 28,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
    IcontextInput: {
      paddingRight: wp(6, viewportWidth),
      paddingLeft: 2,
      fontSize: 14,
      flex: 1,
    },
    h1Text: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#38C7C2',
    },
    subComponent: {
      marginTop: wp(5, viewportHeight),
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexBoard: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    screenBottomContainer: {
      alignItems: 'center',
      flex: 3,
      justifyContent: 'flex-end',
    },
    inlineWarnignStyle: {
      color: colorData.warningColor,
      fontSize: 12,
      fontStyle: 'italic',
    },
  }),

  // LOGIN SCREEN STYLE
  loginScreenStyle: StyleSheet.create({
    socialMediaLogin: {
      height: wp(15, viewportWidth),
      width: wp(15, viewportWidth),
      resizeMode: 'contain',
    },
    inlineWarnignStyle: {
      color: colorData.warningColor,
      fontSize: 12,
      alignSelf: 'flex-start',
      fontStyle: 'italic',
      marginLeft: 50,
      marginTop: -6,
    },
  }),

  // SIGNUP SCREEN STYLE
  signupScreenStyle: StyleSheet.create({
    ScreenContainer: {
      marginTop: wp(5, viewportHeight),
    },
    fields: {
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: StyleSheet.hairlineWidth,
      // paddingVertical: 8,
    },
    fieldWithRedBottom: {
      borderBottomColor: colorData.warningColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    subFieldsText: {
      paddingVertical: 4,
    },
    passwordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textinputStyle: {
      fontSize: 15,
      fontWeight: '600',
    },
  }),

  // RADIO_FORM SUBCOMPONENT STYLE
  radioFormStyle: StyleSheet.create({
    radioForm: {
      flexDirection: 'row',
      paddingVertical: 5,
    },
    radioButton: {
      flexDirection: 'row',
      paddingRight: 16,
    },
    button: {

    },
    label: {
      fontSize: 15,
      color: '#000',
      paddingHorizontal: 10,
      fontWeight: '600',
    },
  }),

  // FORGOT_PASSWORD SCREEN STYLE
  forgotPassScreenStyle: StyleSheet.create({
    emailInputWrapper: {
      flex: 2,
      justifyContent: 'center',
    },
  }),

  // VERIFICATION SCREEN STYLE
  VerificationScreenStyle: StyleSheet.create({
    OTPInputWrapper: {
      // flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpInput: {
      // flex: 1,
      // flexDirection: 'row',
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal: 5,
      justifyContent: 'center',
      // alignItems: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
      backgroundColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
    },
    otpTextInput: {
      fontSize: 28,
      // fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      color: 'white',
    },
  }),

  // SET PASSWORD SCREEN STYLE
  SetPasswordScreenStyle: StyleSheet.create({
    passFieldWrapper: {
      flex: 2,
      justifyContent: 'space-evenly',
    },
  }),

  // SCREEN SWIPER SCREEN STYLE
  screenSwiperStyle: StyleSheet.create({
    subContainer: {
      paddingVertical: 10,
    },
    slider: {
      marginTop: 10,
      overflow: 'visible', // for custom animations
    },
    sliderContentContainer: {
      paddingVertical: 10, // for custom animation
    },
    paginationContainer: {
      paddingVertical: 8,
    },
    paginationDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 3,
    },
  }),

  // PROFILE SCREEN STYLE
  ProfileScreenStyle: StyleSheet.create({
    slideInnerContainer: {
      width: itemWidth,
      height: slideHeight,
      backgroundColor: 'transparent',
      // paddingHorizontal: itemHorizontalMargin,
      paddingTop: viewportHeight * 0.10,
      paddingBottom: 18, // needed for shadow
    },
    shadow: {
      position: 'absolute',
      top: 0,
      left: itemHorizontalMargin,
      right: itemHorizontalMargin,
      bottom: 18,
      shadowColor: '#1a1917',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      borderRadius: entryBorderRadius,
    },
    innerContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    editContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 20,
    },
    editButton: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    dataContainer: {
      alignItems: 'center',
    },
    seprator: {
      borderBottomColor: '#6e7379',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginHorizontal: 20,
    },
    valueText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    profilePicture: {
      width: 2 * (viewportHeight * 0.10),
      height: 2 * (viewportHeight * 0.10),
      // backgroundColor: 'red',
      resizeMode: 'contain',
      borderRadius: viewportHeight * 0.10,
      top: 0,
      left: (itemWidth / 2) - (viewportHeight * 0.10),
      position: 'absolute',
    },
    cutLeft: {
      width: 20,
      height: 20,
      backgroundColor: '#bbe491',
      borderRadius: 10,
      top: ((slideHeight + (viewportHeight * 0.08)) / 2) - (20 / 2),
      left: 0 - (20 / 2),
      position: 'absolute',
    },
    cutRight: {
      width: 20,
      height: 20,
      backgroundColor: '#bbe491',
      borderRadius: 10,
      top: ((slideHeight + (viewportHeight * 0.08)) / 2) - (20 / 2),
      left: itemWidth - (20 / 2),
      position: 'absolute',
    },
  }),

  // ADDRESS SCREEN STYLE
  AddressScreenStyle: StyleSheet.create({
    addressFont: {
      fontSize: 12,
    },
    addressContainer: {
      paddingHorizontal: 8,
      paddingVertical: 5,
    },
    addressTypeContainer: {
      backgroundColor: '#F7F7F7',
      marginLeft: 5,
      paddingHorizontal: 10,
    },
    addressTypeFont: {
      fontSize: 10,
    },
    headerStyle: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    defaultAddressImage: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingTop: 5,
    },
    toolsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    toolsItemImage: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    nameFont: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    addLinkContainer: {
      paddingTop: 10,
      justifyContent: 'flex-end',
      flex: 1,
    },
  }),

  // MYCARD SCREEN STYLE
  MyCardScreenStyle: StyleSheet.create({
    defaultText: {
      fontSize: 8,
    },
    cardImage: {
      height: 30,
      width: 40,
      resizeMode: 'contain',
    },
    cvvContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    cvvImage: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      // paddingHorizontal: 2,
    },
    securityFont: {
      fontSize: 5,
      paddingVertical: 5,
    },
    cvvTextinput: {
      borderWidth: 1,
      borderColor: 'black',
      marginHorizontal: 5,
    },
  }),

  // EDIT PROFILE SCREEN STYLES
  editProfileScreenStyle: StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    subContainer: {
      flex: 1,
      margin: wp(5, viewportHeight),
      marginTop: wp(13, viewportHeight),
    },
    profileImage: {
      height: 140,
      width: 140,
      borderRadius: 70,
      resizeMode: 'contain',
    },
    changeProfileButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      position: 'absolute',
      top: 0 + 10,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    changeProfileButtonImage: {
      height: 40,
      width: 40,
      borderRadius: 20,
      resizeMode: 'contain',
    },
    nameText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#1f1f1f',
    },
    formContainer: {
      flex: 1,
    },
    formFieldContainer: {
      flex: 3,
      justifyContent: 'space-evenly',
    },
    changePassContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // paddingTop: 12,
    },
    submitButtonContainer: {
      flex: 2,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }),

  // HOME SCREENS STYLES
  HomeStyle: StyleSheet.create({
    container: {
      flex: 1,
      marginTop: wp(13, viewportHeight),
      paddingTop: 20,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
    },
    innerContainer: {
      flex: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20,
    },
    username: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: 'black',
    },
    discover: {
      fontSize: 30,
      textAlign: 'center',
      color: '#6ADDD6',
    },
    imageStyle: {
      width: 180,
      height: 180,
    },
    iconStyle: {
      width: 50,
      height: 50,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  }),

  // CreateList screen style
  CreateListStyles: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingBottom: 20,
      marginTop: wp(13, viewportHeight),
      flexDirection: 'column',
    },

    itemContainer: {
      marginTop: 16,
    },

    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    colorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    textStyle: {
      color: colorData.greyTextColor,
      fontSize: 13,
    },

    textValueStyle: {
      color: colorData.blackTextColor,
      fontWeight: 'bold',
      fontSize: 15,
    },

    textInputStyle: {
      color: colorData.blackTextColor,
      fontSize: 15,
      fontWeight: 'bold',
    },

    line: {
      borderBottomColor: colorData.lineColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 8,
    },
    warningline: {
      borderBottomColor: colorData.warningColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 8,
    },
    iconStyle: {
      width: 25,
      height: 25,
    },

    rightIcon: {
      width: 50,
      height: 50,
    },
    circle: {
      width: 36,
      height: 36,
      borderRadius: 36 / 2,
      overflow: 'hidden',
    },
    iconContainer: {
      marginTop: 30,
      flex: 1,
      justifyContent: 'flex-end',
      alignSelf: 'center',
    },
  }),

  // My list screen style
  MyOrderListStyles: StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      paddingVertical: 7,
      paddingHorizontal: 10,
      marginTop: wp(13, viewportHeight),
      backgroundColor: 'white',
    },
    iconStyle: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    line: {
      borderBottomColor: '#fbfbfb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    imageStyle: {
      height: 30,
      width: 30,
    },
    deleteImage: {
      width: 50,
      height: 50,
    },
    imageTextStyle: {
      color: 'white',
      fontSize: 9,
      marginLeft: 4,
    },
    imageContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      marginTop: 6,
    },
    standaloneRowBack: {
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    backTextWhite: {
      color: 'black',
    },
    collabImageContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: 10,
    },
    gredientStyle: {
      flexDirection: 'row',
      padding: 8,
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: 'white',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 1,
    },
    priceStyle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#57D892',
      marginLeft: 8,
    },
    placeOrderStyle: {
      color: 'black',
      fontSize: 12,
      alignSelf: 'flex-end',
      fontWeight: 'bold',
    },
  }),

  NotificationStyle: StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 7,
      paddingHorizontal: 10,
      marginTop: wp(10, viewportHeight),
      backgroundColor: 'white',
    },

    imageTextStyle: {
      color: colorData.lightgreyTextColor,
      fontSize: 9,
      marginLeft: 4,
    },
    iconStyle: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },

    textStyle: {
      color: colorData.lightgreyTextColor,
      fontSize: 14,
    },
    boldTextStyle: {
      color: colorData.greyTextColor,
      fontSize: 14,
      fontWeight: '600',
    },
    notificationHeaderStyle: {
      fontWeight: '600',
      alignSelf: 'center',
      flex: 1,
      fontSize: 20,
      marginVertical: 10,
      color: colorData.blackTextColor,
    },
    itemStyle: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      marginTop: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 1,
    },
    itemContainerStyle: {
      flex: 1,
      backgroundColor: '#57D892',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    leftContainerStyle: {
      flex: 5,
      backgroundColor: 'white',
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
    },
  }),
  ProductListStyle: StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 7,
      marginTop: wp(13, viewportHeight),
      paddingBottom: 26,
    },
    searchIcon: {
      width: 18,
      height: 18,
    },
    line: {
      borderBottomColor: colorData.lineColor,
      borderBottomWidth: 1,
      marginTop: 4,
    },
    tabTitle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 14,
      marginLeft: 5,
    },
    verticalLine: {
      borderRightColor: colorData.verticalDividerColor,
      borderRightWidth: 1,
    },
    finalRate: {
      color: colorData.blackTextColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    previousRate: {
      color: colorData.redTextColor,
      fontSize: 11,
    },
    listItemTitle: {
      color: colorData.blackTextColor,
      fontSize: 15,
    },
    listItemQuantity: {
      color: colorData.lightgreyTextColor,
      fontSize: 13,
    },
    gridItemStyle: {
      backgroundColor: colorData.productItemBgColor,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      margin: 3,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
    },
    listItemStyle: {
      backgroundColor: colorData.productItemBgColor,
      paddingLeft: 8,
      paddingTop: 8,
      marginBottom: 6,
      borderRadius: 6,
    },
    optionContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopColor: colorData.lineColor,
      borderTopWidth: 1,
      borderBottomColor: colorData.lineColor,
      borderBottomWidth: 1,
      padding: 8,
      marginBottom: 16,
      marginTop: 4,
    },
    gridItemImageStyle: {
      width: 100,
      height: 100,
      marginTop: 16,
      marginBottom: 6,
    },

    listItemFinalRateConatienrStyle: {
      position: 'absolute',
      right: 8,
      top: 4,
      alignItems: 'center',
    },
    listItemImageStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    gridItemNotifyContainerStyle: {
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 0.5,
      marginVertical: 5,
      alignSelf: 'stretch',
    },
  }),

  OrderHistotyStyle: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    listItemStyle: {
      marginBottom: 10,
      flex: 1,
      backgroundColor: colorData.bgColor,
      paddingHorizontal: 10,
      paddingTop: 10,
      borderRadius: 6,
    },
    itemHeaderStyle: {
      fontSize: 12,
      fontWeight: 'normal',
      color: colorData.greyTextColor,
    },
    itemValueStyle: {
      fontSize: 12,
      fontWeight: '600',
      color: colorData.blackColor,
    },
    line: {
      borderBottomColor: colorData.lineColor,
      borderBottomWidth: 1,
      marginBottom: 6,
    },
    sortByStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginHorizontal: 8,
      marginVertical: 8,
    },
  }),

  OrderDetailStyle: StyleSheet.create({
    container: {
      flex: 1,
      marginTop: wp(12, viewportHeight),
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      borderBottomColor: colorData.lineColor,
      borderTopColor: colorData.lineColor,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingVertical: 6,
    },
    listItemTextStyle: {
      color: colorData.blackTextColor,
      fontSize: 12,
      fontWeight: '600',
    },
    listItemStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 8,
      marginBottom: 4,
      borderRadius: 6,
      backgroundColor: colorData.bgColor,
    },
    accordianHeaderStyle: {
      flexDirection: 'row',
      backgroundColor: colorData.bgColor,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    accordianListItemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colorData.lineColor,
    },
  }),
};

export default styles;
