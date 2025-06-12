import YouTubeCard from "./YouTubeCard";
import PinterestCard from "./PinterestCard";
import MapCard from "./MapCard";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen bg-gray-100">
      <YouTubeCard title="Video de YouTube" />
      {/* Pin grande fuera del grid */}
      <PinterestCard
        title="Pin de Pinterest Destacado"
        pinUrl="https://assets.pinterest.com/ext/embed.html?id=51158145761246899"
        width={450}
        height={550}
      />
      {/* Grid de pins */}
      <div className="grid grid-flow-row auto-cols-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start w-auto">
        <PinterestCard
          title="Pin de Pinterest 1 (Grande)"
          pinUrl="https://assets.pinterest.com/ext/embed.html?id=51158145761246893"
          width={450}
          height={837}
        />
        <PinterestCard
          title="Pin de Pinterest 2"
          pinUrl="https://assets.pinterest.com/ext/embed.html?id=139682025938078968"
          width={345}
          height={550}
        />
        <PinterestCard
          title="Pin de Pinterest 3"
          pinUrl="https://assets.pinterest.com/ext/embed.html?id=370702613097771065"
          width={345}
          height={300}
        />
      </div>
      
<MapCard
  title="Templo de San Agustín"
  mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1762.9238991506766!2d-101.19876750635979!3d20.56740140181452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842c850dd6958ab9%3A0x7781af26707dc3c9!2sTemplo%20de%20San%20Agust%C3%ADn!5e0!3m2!1ses!2smx!4v1749754843876!5m2!1ses!2smx"
/>
    </div>
  );
}