import{_ as u,h as x,r as f,j as g,k as c,c as v,a as s,b as p,f as n,l as y,t as a,m as o,d as b,o as A}from"./index-BqirT0g1.js";import{f as k}from"./utils-DIZ2_vDv.js";import{_ as E}from"./ChartPage-DBfYrFXo.js";const L={class:"container"},B={class:"el-text el-text--large"},C={class:"count"},N={class:"el-text el-text--large"},O={href:"https://www.birdreport.cn",target:"new"},j={class:"count"},S={class:"count"},V={class:"count"},w={class:"count"},D={__name:"Index",setup(F){const e=x(),l=f(534),i=g(()=>(Object.keys(e.speciesList).length/l.value*100).toFixed(2)),r=c({title:{text:"2020-2024 年鸟种数据一览"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",data:[2020,2021,2022,2023,2024].reverse()},yAxis:{type:"value"},series:[{name:"鸟种数",type:"bar",data:[Object.keys(e.speciesList).length,389,360,364,315]},{name:"所属科数",type:"bar",stack:"Ad",data:[e.taxonList.family.length,67,65,65,62]},{name:"所属目数",type:"bar",stack:"Ad",data:[e.taxonList.order.length,19,19,20,19]},{name:"鸟种走势",type:"line",data:[Object.keys(e.speciesList).length,389,360,364,315],markPoint:{data:[{type:"max",name:"峰值"}]}}]});return(d,t)=>{const m=b("svg-icon");return A(),v("section",L,[s("p",B,[t[0]||(t[0]=n(" 上海野鸟会于 2025 年 3 月 19 日 在其公众号上发布了《上海市鸟类名录2024》。数据显示，截止 2024 年底，上海市共记录到鸟类 ",-1)),t[1]||(t[1]=s("span",{class:"count"},"22",-1)),t[2]||(t[2]=n(" 目 ",-1)),t[3]||(t[3]=s("span",{class:"count"},"82",-1)),t[4]||(t[4]=n(" 科，共计 ",-1)),s("span",C,a(l.value),1),t[5]||(t[5]=n(" 种，占全国鸟类种数的 ",-1)),t[6]||(t[6]=s("span",{class:"count"},"35.2%",-1)),n("（2024 年底全国记录鸟种数量据统计为 "+a(o(k)(1516))+"）。其中列入国保一级 ",1),t[7]||(t[7]=y('<span class="count" data-v-2e5f8e48>29</span> 种，国保二级 <span class="count" data-v-2e5f8e48>93</span> 种；列入 <strong data-v-2e5f8e48>IUCN</strong> 濒危物种红色名录( Red List )中极危(CR)物种 <span class="count" data-v-2e5f8e48>7</span> 种，濒危(EN)物种 <span class="count" data-v-2e5f8e48>10</span> 种，易危(VU)物种 <span class="count" data-v-2e5f8e48>28</span> 种。 ',12))]),s("p",N,[t[9]||(t[9]=n("本网站从中国最权威的鸟类数据观察记录网站 ",-1)),s("a",O,[p(m,{"svg-name":"icon-link"}),t[8]||(t[8]=n(" 中国观鸟记录中心",-1))]),t[10]||(t[10]=n(" (以下简称“观鸟中心”)获取 2024 年度上海鸟类观察数据样本，从鸟种记录频次、多样性等方面，试图初步分析探讨一下上海一鸟类的现状。",-1))]),t[15]||(t[15]=s("p",{class:"el-text el-text--large"}," 从观鸟中心的前端页面，我们可以获取到 2024 年度上海地区的每月由鸟友提交而来的鸟种数据，打开浏览器控制台，可以从网络标签里截获客户端和服务器异步通讯传来的一组 JSON 数据，其格式如下： ",-1)),t[16]||(t[16]=s("pre",{class:"code"},`  {
    "code": 0,
    "count": 416,
    "data": "sNm8rcODHOMHbmjl42LphVTk5pvxUC3R7cOEpv9EjibSp2geqSbQ6if...",
    "timestamp": 1756647245,
    "sign": "EF0CE3680AA2B6DECA54EB51BCF223B8",
    "requestId": "0A3E343E-B6A3-41CA-B0DF-0AEA30D1F2A9"
  }`,-1)),t[17]||(t[17]=s("p",null,"可以看到其 data 部分的数据经过了某种算法的再次编码，但是网页上能正常显示所获得的数据，可以肯定，这一定是可逆的。通过解读源代码，发现其 encode/decode 算法库也是经过源码混淆的，没法解读。经过仔细研判，还是找出了暴露在源码里的解码函数，至此，我们顺利的将观鸟中心 2024 年上海地区 12 个月的鸟种数据全部获取，并解码、序列化，清洗成了这次我们需要的数据，其基本格式如下：",-1)),t[18]||(t[18]=s("pre",{class:"code"},`  [
    {
      "englishname": "Common Pheasant",
      "recordcount": 157,
      "taxonordername": "鸡形目",
      "taxon_id": 4040,
      "taxonfamilyname": "雉科",
      "latinname":" Phasianus colchicus",
      "taxonname": "环颈雉"
    },
    ...
  ]`,-1)),s("p",null,[t[11]||(t[11]=n("以上为单月数据格式，经由对 12 个月的数据进行查询统计，上海地区 2024 年度（去除存疑、逃逸鸟种）记录到 ",-1)),s("span",j,a(o(e).taxonList.order.length||0),1),t[12]||(t[12]=n(" 目 ",-1)),s("span",S,a(o(e).taxonList.family.length||0),1),t[13]||(t[13]=n(" 科，共计",-1)),s("span",V,a(Object.keys(o(e).speciesList).length||0),1),n(" 种鸟类，占上海历史鸟种数("+a(l.value)+")的 ",1),s("span",w,a(i.value)+"%",1),t[14]||(t[14]=n("。 ",-1))]),p(E,{option:r},null,8,["option"]),t[19]||(t[19]=s("p",null," 由上图可见，近几年在上海地区记录到的鸟种呈现了递增的趋势，说明了上海及其周边地区的环境水平在逐年的优化和改善。另一方面，日益增多的观鸟人口，尤其是青少年观鸟人口的增加，让许多鸟种得到有效的目击和记录。 ",-1))])}}},U=u(D,[["__scopeId","data-v-2e5f8e48"]]);export{U as default};
