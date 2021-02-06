
var app = new Vue({
  el: "#app",
  data: {
    iOrWe: "",
    typeOfApp: "",
    typeOfAppTxt: "[مفتوح المصدر/مجاني/فريميوم/مدعوم بإعلانات/تجاري]",
    typeOfDev: "",
    appName: "",
    appContact: "",
    myOrOur: "",
    meOrUs: "",
    atNoCost: "[بدون تكاليف]",
    retainedInfo:
      "سيتم الاحتفاظ بالمعلومات التي نطلبها من قبلنا واستخدامها كما هو موضح في سياسة الخصوصية هذه",
    devName: "",
    companyName: "",
    devOrCompanyName: "[المطور/اسم الشركة]",
    pidInfoIn: "",
    pidInfo:
      "[أضف أي شيء آخر تجمعه هنا، على سبيل المثال اسم المستخدمين، العنوان، الموقع، الصور]",
    osType: "",
    effectiveFromDate: new Date().toISOString().slice(0, 10),
    requirementOfSystem: "النظام",
    thirdPartyServices: thirdPartyServicesJsonArray,
    showPrivacyModal: false,
    showGDPRPrivacyModal: false,
    showTermsModal: false,
    showDisclaimerModal: false,
    hasThirdPartyServicesSelected: true,
    contentRenderType: 1,
    wizardStep: 1,
    totalWizardSteps: 3,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    preview: function (id) {
      this.contentRenderType = 1
    },
    nextStep: function () {
      if (this.wizardStep <= this.totalWizardSteps) {
        if (this.wizardStep == 1) {
          if (this.appName.length == 0 || this.appName == "" || this.appName == null || this.appName == "يرجى كتابة اسم التطبيق!") {
            this.appName = "يرجى كتابة اسم التطبيق!"
            return
          }

          if (this.appContact.length == 0 || this.appContact == "" || this.appContact == null || this.appContact == "الرجاء كتابة معلومات الاتصال!") {
            this.appContact = "الرجاء كتابة معلومات الاتصال!"
            return
          }
        }

        this.wizardStep += 1
      }
    },
    prevStep: function () {
      if (this.wizardStep >= 1) {
        this.wizardStep -= 1
      }
    },
    checkForThirdPartyServicesEnabled: function () {
      let listOfEnabledThirdPartyServices = []
      this.thirdPartyServices.forEach((item) => {
        if (item[item.model] == true) {
          listOfEnabledThirdPartyServices.push(true)
        }
      })

      return listOfEnabledThirdPartyServices.length > 0
    },
    toggleState: function (item) {
      let state = item.model

      // console.log('Item:', item.name, item.model, item[state])
      // For reactive update of the json
      // Toggle the state
      Vue.set(thirdPartyServicesJsonArray, item.model, !item[state])
    },
    getHtml: function (id, target) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      this.contentRenderType = 2
      loadInTextView(target, rawHTML)
    },
    getMarkdown: function (id, target) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      let markdown = convertHtmlToMd(rawHTML)
      this.contentRenderType = 2
      loadInTextView(target, markdown)
    },
    generate: function () {
      if (this.typeOfDev === "فرد") {
        this.devOrCompanyName = this.devName
        this.iOrWe = ""
        this.myOrOur = ""
        this.meOrUs = ""
        this.retainedInfo =
          "محتفظ بها على جهازك ولا يتم جمعها بواسطة " +
          this.meOrUs +
          " بأي طريقة"
      } else if (this.typeOfDev === "شركة") {
        this.devOrCompanyName = this.companyName
        this.iOrWe = ""
        this.myOrOur = ""
        this.meOrUs = ""
        this.retainedInfo =
          "يتم الاحتفاظ بها من قبلنا واستخدامها على النحو الموضح في سياسة الخصوصية هذه"
      }

      if (this.typeOfApp === "تجاري") {
        this.atNoCost = ""
      } else {
        this.atNoCost = "بدون تكاليف"
      }

      if (this.pidInfoIn === "") {
        this.pidInfo = "."
      } else {
        this.pidInfo = "، بما في ذلك على سبيل المثال لا الحصر، " + this.pidInfoIn + "."
      }

      switch (this.typeOfApp) {
        case "مجاني":
        case "فريميوم":
        case "تجاري":
          this.typeOfAppTxt = "" + this.typeOfApp
          break
        case "مفتوح المصدر":
        case "مدعوم بإعلانات":
          this.typeOfAppTxt = "" + this.typeOfApp
          break
      }

      switch (this.osType) {
        case "Android": {
          this.osType = "Android"
          this.requirementOfSystem = "النظام"
          break
        }
        case "iOS": {
          this.osType = "iOS"
          this.requirementOfSystem = "النظام"
          break
        }
        case "Android و iOS": {
          this.osType = "Android و iOS"
          this.requirementOfSystem = "كلا النظامين"
          break
        }
      }
    },
    togglePrivacyModalVisibility: function () {
      this.generate()
      this.hasThirdPartyServicesSelected = this.checkForThirdPartyServicesEnabled()
      this.contentRenderType = 1
      this.showPrivacyModal = !this.showPrivacyModal
    },
    toggleGDPRPrivacyModalVisibility: function () {
      this.generate()
      this.hasThirdPartyServicesSelected = this.checkForThirdPartyServicesEnabled()
      this.contentRenderType = 1
      this.showGDPRPrivacyModal = !this.showGDPRPrivacyModal
    },
    toggleTermsModalVisibility: function () {
      this.generate()
      this.hasThirdPartyServicesSelected = this.checkForThirdPartyServicesEnabled()
      this.contentRenderType = 1
      this.showTermsModal = !this.showTermsModal
    },
    toggleDisclaimerModalVisibility: function () {
      this.showDisclaimerModal = !this.showDisclaimerModal
    },
  },
})
