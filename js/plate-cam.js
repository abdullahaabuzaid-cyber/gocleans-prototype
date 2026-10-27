/* Shared plate-camera demo data + fake camera scene (admin & POS). ALL FAKE */
const PD=[{p:'456 321',c:98.6,n:'خالد المري',pk:2,left:5,s:'ok',car:'لاند كروزر'},{p:'218 774',c:96.1,n:'سارة العبدالله',pk:1,left:2,s:'ok',car:'كامري'},{p:'903 112',c:93.4,n:'—',pk:-1,left:0,s:'none',car:'—'},{p:'115 640',c:97.2,n:'فهد الكعبي',pk:0,left:0,s:'zero',car:'باترول'},{p:'332 908',c:91.8,n:'نورة السليطي',pk:2,left:0,s:'exp',car:'ES 350'},{p:'774 205',c:95.5,n:'يوسف النعيمي',pk:1,left:3,s:'pay',car:'أكورد'}];
const PCH={ok:'ok',none:'gray',exp:'err',zero:'warn',pay:'info'};
const CAMPH=[['img/cam-rear.jpg','center 70%'],['img/car-lexus-lx.jpg','center 60%'],['img/car-rangerover.jpg','center 55%'],['img/car-gclass.jpg','center 50%']];
/* REAL photo camera scene (replaces the old cartoon SVG). i = camera index */
const camSvg=(i=0)=>{const c=CAMPH[i%CAMPH.length];return `<img class="cam-svg" src="${c[0]}" alt="" style="object-position:${c[1]}">`};
