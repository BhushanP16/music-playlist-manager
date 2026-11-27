export default function Equalizer({ playing = true }) {
  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${i * 0.18}s`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
    </span>
  );
}