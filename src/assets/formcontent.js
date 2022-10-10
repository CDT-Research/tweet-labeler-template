const stereotypelist = [
  {name:"enemy", label:"Enemy of the public", isChecked:false, reqlist:["gender","race","sexualorientation","disability","religion","socioecon", "other"]},
  {name: "oversex", label:"Overly sexual", isChecked:false, reqlist:["gender","race","sexualorientation"]},
  {name: "overappearance",label:"Overly concerned with appearance", isChecked:false, reqlist:["gender","race","sexualorientation"]},
  {name:"violatinggender",label:"Violating gender roles", isChecked:false, reqlist:["gender"]},
  {name:"followinggender", label:"Following gender roles", isChecked:false, reqlist:["gender"]},
  {name:"wascold", label: "W as cold and emotionless", isChecked:false, reqlist:["gender"]},
  {name: "washysterical", label:"W as emotional or hysterical", isChecked:false, reqlist:["gender"]},
  {name: "wasradical", label: "W as radical feminists", isChecked:false, reqlist:["gender"]},
  {name: "wasunintelligent", label: "W as unintelligent", isChecked:false, reqlist:["gender"]},

  {name: "wotherstereotype", label: "W other gender stereotype", isChecked:false, reqlist:["gender"]},


  {name: "motherly", label: "W as too motherly", isChecked:false, reqlist:["gender"]},
  {name: "criminals", label: "PoC as criminals", isChecked:false, reqlist:["race"]},
  {name: "poclazy", label: "PoC as idle or lazy", isChecked:false, reqlist:["race"]},
  {name: "bluecollar", label: "PoC as unemployed or blue collar", isChecked:false, reqlist:["race"]},
  {name: "pocviolent", label: "PoC as violent", isChecked:false, reqlist:["race"]},
  {name: "pocotherstereotype", label: "PoC other racial stereotype", isChecked:false, reqlist:["race"]},
  {name: "unintelligent", label: "PoC as unintelligent", isChecked:false, reqlist: ["race"]},
  {name: "idasillness", label: "Identity as illness", isChecked:false, reqlist: ["disability", "sexualorientation"]},
  {name: "dassuperhuman", label: "D as superhuman", isChecked:false, reqlist: ["disability"]},
  {name: "dascostly", label: "D as costly", isChecked:false, reqlist: ["disability"]},
  {name: "dasinneed", label: 'D as "in need"', isChecked:false, reqlist:["disability"]},
  {name: "dotherstereotype", label: "D other disability stereotype", isChecked:false, reqlist:["disability"]},
  {name: "qwithdisposable", label: "Q with disposable income", isChecked:false, reqlist:["sexualorientation"]},
  {name: "qashedonistic", label: "Q as hedonistic", isChecked: false, reqlist: ["sexualorientation"]},
  {name: "qasfunny", label: "Q as funny or cheerful", isChecked:false, reqlist: ["sexualorientation"]},
  {name: "qasmanly", label: "Q as manly", isChecked:false, reqlist:["sexualorientation"]},
  {name: "qasbestfriend", label: "Q as best friend", isChecked:false, reqlist:["sexualorientation"]},
  {name: "qotherstereotype", label:"Q other LGBTQ+ stereotype", isChecked:false, reqlist:["sexualorientation"]},
  {name:"otherstereotype", label:"Other stereotype, not listed", isChecked:false, reqlist:["gender","race","sexualorientation","disability","religion","socioecon","other"]}

]

const abuseTypes = [
  {name: "demeans", label: "Demeans/belittles", isChecked:false},
  {name: "directthreat", label:"Direct Threat", isChecked:false},
  {name: "indirectthreat", label: "Indirect Threat", isChecked:false},
  {name: "doxing", label: "Doxing", isChecked:false},
  {name: "embarrassing", label: "Embarrassing", isChecked:false},
  {name: "impersonation", label: "Impersonation", isChecked:false},
  {name: "generaloffensive", label: "General offensive language", isChecked:false},
  {name: "sexism", label: "Sexism or misogyny", isChecked:false},
  {name: "racism", label: "Racism", isChecked:false},
  {name: "homophobiatransphobia", label: "Homophobia or transphobia", isChecked:false},
  {name: "ethnicslur", label: "Ethnic or religious slur", isChecked:false},
  {name: "promotesviolence", label: "Promotes or incites violence", isChecked:false},
  {name: "sexualcontent", label: "Sexual content", isChecked:false},
  {name: "sexualassault", label: "Sexual assault", isChecked:false},
  {name: "vandalizing", label: "Vandalizing", isChecked:false},
  {name: 'otherabuse', label: 'Other form of harassment or abuse', isChecked:false}


]

const idtypes = [
  {name: 'gender', label: 'Gender', isChecked:false},
  {name: 'race', label: 'Race/Ethnicity'},
  {name: 'sexualorientation', label: 'Sexual Orientation', isChecked:false},
  {name: 'disability', label: 'Disability', isChecked:false},
  {name: 'religion', label: 'Religion', isChecked:false},
  {name: 'socioecon', label: 'Socio-economic status', isChecked:false},
  {name: 'other', label: 'Other', isChecked:false}
]

export {stereotypelist, abuseTypes, idtypes}
