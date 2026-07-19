import SuspiciousLoginIcon from "@/assets/ic_danger.svg";
import NewDeviceIcon from "@/assets/ic_bell_16.svg";
import PasswordChangeIcon from "@/assets/ic_info_16.svg";
import LocationChangeIcon from "@/assets/ic_map_pin.svg";
import RecoveryEmailIcon from "@/assets/ic_email.svg";

const EVENT_ICON = {
  suspicious_login: SuspiciousLoginIcon,
  new_device: NewDeviceIcon,
  password_change: PasswordChangeIcon,
  location_change: LocationChangeIcon,
  recovery_email: RecoveryEmailIcon,
};
const DEFAULT_EVENT_ICON = SuspiciousLoginIcon;

function EventsList({ events }) {
  return (
    <>
      <h3 className="mb-8 text-sb16 font-bold text-gray100">최근 이벤트</h3>
      <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_2px_7px_rgba(16,24,46,0.08)]">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 px-4 py-3">
            <img
              src={EVENT_ICON[event.type] ?? DEFAULT_EVENT_ICON}
              alt=""
              className="h-4 w-4 shrink-0"
            />
            <div className="flex-1">
              <p className="text-sb16 text-[12px] text-gray100">{event.name}</p>
              <small className="mt-0.5 block text-[10px] text-gray50">
                {event.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventsList;
