const Stats = () => {
  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center text-primary-foreground">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
            <div className="text-lg opacity-90">Pengguna Aktif</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
            <div className="text-lg opacity-90">Makanan Teranalisis</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">85%</div>
            <div className="text-lg opacity-90">Tingkat Kepuasan</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
            <div className="text-lg opacity-90">Akses Kapan Saja</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
