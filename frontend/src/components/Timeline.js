const Timeline = ({ events }) => {
  return (
    <div className="relative border-l-4 border-nintendo-blue pl-8">
      {events.map((event, idx) => (
        <div key={idx} className="mb-10">
          <div className="absolute -left-3 w-6 h-6 bg-nintendo-blue rounded-full"></div>
          <h3 className="text-xl font-semibold">{event.year} – {event.event}</h3>
          <p className="text-gray-600">{event.details}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;