"use client"

import React, { FC, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"
import { LatLng, icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import iconImage from "leaflet/dist/images/marker-icon.png"

const slist = [
  { name: "五稜郭跡", lat: 41.79722222, lng: 140.7569444 },
  { name: "常呂遺跡", lat: 44.12944444, lng: 144.0161111 },
  { name: "上之国勝山館跡", lat: 41.80055556, lng: 140.0991667 },
  { name: "三内丸山遺跡", lat: 40.81138889, lng: 140.6966667 },
  { name: "十三湊遺跡", lat: 41.02805556, lng: 140.3297222 },
  { name: "骨寺村荘園遺跡", lat: 38.97833333, lng: 140.9536111 },
  { name: "橋野高炉跡", lat: 39.34388889, lng: 141.6825 },
  { name: "多賀城跡", lat: 38.30666667, lng: 140.9883333 },
  { name: "秋田城跡", lat: 39.74083333, lng: 140.0811111 },
  { name: "大湯環状列石", lat: 40.27138889, lng: 140.8044444 },
  { name: "本間家旧本邸", lat: 38.91444444, lng: 139.8394444 },
  { name: "白水阿弥陀堂", lat: 37.03611111, lng: 140.8372222 },
  { name: "平沢官衙遺跡", lat: 36.17805556, lng: 140.1033333 },
  { name: "虎塚古墳", lat: 36.37388889, lng: 140.5694444 },
  { name: "足利学校跡", lat: 36.33583333, lng: 139.4533333 },
  { name: "寺野東遺跡", lat: 36.32611111, lng: 139.8819444 },
  { name: "上野三碑", lat: 36.265, lng: 138.9963889 },
  { name: "富岡製糸場", lat: 36.25527778, lng: 138.8875 },
  { name: "岩宿遺跡", lat: 36.4, lng: 139.2875 },
  { name: "埼玉古墳群", lat: 36.12694444, lng: 139.4791667 },
  { name: "鉢形城跡", lat: 36.10916667, lng: 139.1958333 },
  { name: "加曽利貝塚", lat: 35.62361111, lng: 140.165 },
  { name: "上総国分尼寺跡", lat: 35.49972222, lng: 140.1180556 },
  { name: "江戸城跡", lat: 35.68722222, lng: 139.7552778 },
  { name: "旧新橋停車場跡", lat: 35.66583333, lng: 139.7616667 },
  { name: "湯島聖堂", lat: 35.70055556, lng: 139.7669444 },
  { name: "大森貝塚", lat: 35.59083333, lng: 139.7291667 },
  { name: "大塚・歳勝土遺跡", lat: 35.55138889, lng: 139.5805556 },
  { name: "石垣山一夜城跡", lat: 35.23527778, lng: 139.1269444 },
  { name: "旧新潟税関跡", lat: 37.93027778, lng: 139.0569444 },
  { name: "馬高・三十稲場遺跡", lat: 37.4475, lng: 138.7680556 },
  { name: "長者ケ原遺跡", lat: 37.02722222, lng: 137.8655556 },
  { name: "佐渡金山遺跡", lat: 38.04194444, lng: 138.2591667 },
  { name: "瑞泉寺", lat: 36.55861111, lng: 136.9722222 },
  { name: "石動山", lat: 36.96555556, lng: 136.9711111 },
  { name: "一乗谷朝倉氏遺跡", lat: 36.00055556, lng: 136.2955556 },
  { name: "白山平泉寺旧境内", lat: 36.045, lng: 136.5411111 },
  { name: "武田氏館跡", lat: 35.68666667, lng: 138.5766667 },
  { name: "尖石・与助尾根遺跡", lat: 36.01333333, lng: 138.2327778 },
  { name: "森将軍塚古墳", lat: 36.53138889, lng: 138.1372222 },
  { name: "鷹山遺跡群", lat: 36.1525, lng: 138.2094444 },
  { name: "江馬氏城館跡下館跡", lat: 36.32722222, lng: 137.3086111 },
  { name: "関ヶ原古戦場", lat: 35.36777778, lng: 136.4655556 },
  { name: "登呂遺跡", lat: 34.95583333, lng: 138.4080556 },
  { name: "北条氏史跡", lat: 35.04638889, lng: 138.9372222 },
  { name: "長篠城址", lat: 34.92277778, lng: 137.5597222 },
  { name: "伊良湖東大寺瓦窯跡", lat: 34.59527778, lng: 137.0563889 },
  { name: "斎宮跡", lat: 34.54027778, lng: 136.6127778 },
  { name: "石山寺", lat: 34.96027778, lng: 135.9055556 },
  { name: "彦根城", lat: 35.27638889, lng: 136.2516667 },
  { name: "安土城跡", lat: 35.15583333, lng: 136.1391667 },
  { name: "清水寺", lat: 34.99472222, lng: 135.785 },
  { name: "椿井大塚山古墳", lat: 34.76222222, lng: 135.8180556 },
  { name: "難波宮跡", lat: 34.68055556, lng: 135.5233333 },
  { name: "今城塚古墳", lat: 34.85027778, lng: 135.5941667 },
  { name: "日根荘遺跡", lat: 34.37388889, lng: 135.3430556 },
  { name: "池上曽根遺跡", lat: 34.50194444, lng: 135.4272222 },
  { name: "赤穂城跡", lat: 34.74583333, lng: 134.3891667 },
  { name: "平城宮跡", lat: 34.69277778, lng: 135.7972222 },
  { name: "藤原宮跡", lat: 34.50222222, lng: 135.8072222 },
  { name: "纒向遺跡", lat: 34.54333333, lng: 135.8333333 },
  { name: "石舞台古墳", lat: 34.46694444, lng: 135.8261111 },
  { name: "岩橋千塚古墳群", lat: 34.22361111, lng: 135.23 },
  { name: "熊野三山", lat: 33.84027778, lng: 135.7736111 },
  { name: "伯耆国府跡", lat: 35.43111111, lng: 133.7855556 },
  { name: "妻木晩田遺跡", lat: 35.46361111, lng: 133.4525 },
  { name: "荒神谷遺跡", lat: 35.37638889, lng: 132.8525 },
  { name: "田儀櫻井家たたら製鉄所遺跡", lat: 35.20277778, lng: 132.6808333 },
  { name: "石見銀山遺跡", lat: 35.105, lng: 132.4413889 },
  { name: "鬼ノ城", lat: 34.7275, lng: 133.7677778 },
  { name: "備中松山城", lat: 34.80888889, lng: 133.6219444 },
  { name: "草戸千軒町遺跡", lat: 34.47888889, lng: 133.35 },
  { name: "土井ヶ浜遺跡", lat: 34.29361111, lng: 130.8863889 },
  { name: "大内氏館跡", lat: 34.18416667, lng: 131.4802778 },
  { name: "長登銅山跡", lat: 34.245, lng: 131.3358333 },
  { name: "徳島城跡", lat: 34.07527778, lng: 134.555 },
  { name: "屋嶋城", lat: 34.35805556, lng: 134.1011111 },
  { name: "大坂城石垣石切丁場跡", lat: 34.50777778, lng: 134.3488889 },
  { name: "大山祇神社", lat: 34.24805556, lng: 133.0058333 },
  { name: "別子銅山跡", lat: 33.86527778, lng: 133.3280556 },
  { name: "龍河洞", lat: 33.60277778, lng: 133.7452778 },
  { name: "板付遺跡", lat: 33.56555556, lng: 130.4527778 },
  { name: "三井三池炭鉱跡", lat: 33.01305556, lng: 130.4558333 },
  { name: "八女古墳群", lat: 33.23638889, lng: 130.5186111 },
  { name: "大宰府跡", lat: 33.515, lng: 130.5155556 },
  { name: "名護屋城跡", lat: 33.53027778, lng: 129.8691667 },
  { name: "吉野ヶ里遺跡", lat: 33.32555556, lng: 130.3841667 },
  { name: "泉山磁石場跡", lat: 33.19361111, lng: 129.9102778 },
  { name: "出島和蘭商館跡", lat: 32.74361111, lng: 129.8730556 },
  { name: "泉福寺洞穴", lat: 33.20472222, lng: 129.7302778 },
  { name: "平戸和蘭商館跡", lat: 33.37222222, lng: 129.5569444 },
  { name: "原の辻遺跡", lat: 33.75916667, lng: 129.7533333 },
  { name: "原城跡", lat: 32.63416667, lng: 130.2552778 },
  { name: "熊本城", lat: 32.80611111, lng: 130.7058333 },
  { name: "岡城址", lat: 32.96916667, lng: 131.4077778 },
  { name: "宇佐神宮", lat: 33.52333333, lng: 131.3772222 },
  { name: "西都原古墳群", lat: 32.11722222, lng: 131.3883333 },
  { name: "尚古集成館", lat: 31.61722222, lng: 130.5763889 },
  { name: "上野原遺跡", lat: 31.71361111, lng: 130.8013889 },
  { name: "首里城", lat: 26.21694444, lng: 127.7194444 },
  { name: "斎場御嶽", lat: 26.17333333, lng: 127.8272222 },
]

const ZoomComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(15)
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom())
      console.log("zoomend", mapEvents.getZoom())
    },
  })
  return (
    <>
      {slist.map((s) => (
        <Marker
          key={s.name}
          position={convertLatLng(s.lat, s.lng, zoomLevel)}
          icon={icon({
            iconUrl: iconImage.src,
            iconSize: [25, 41],
            iconAnchor: [25, 41],
            popupAnchor: [0, -41],
          })}
        >
          <Popup>{s.name}</Popup>
        </Marker>
      ))}
    </>
  )
}

const IndexPage: FC = () => {
  const [position, setPosition] = useState<LatLng>(
    new LatLng(35.681236, 139.767125)
  )

  return (
    <section style={{ height: "100vh" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ZoomComponent />
      </MapContainer>
    </section>
  )
}

export default IndexPage
const convertLatLng = (lat: number, lng: number, zoom: number) => {
  const rank = Math.max(10 ** Math.ceil((zoom - 10) / 2), 10)
  return new LatLng(
    Math.round(lat * rank) / rank,
    Math.round(lng * rank) / rank
  )
}
