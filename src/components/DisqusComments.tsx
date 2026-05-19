import { useEffect } from "react";

export default function DisqusComments() {
  useEffect(() => {
    const config = function (this: any) {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
    };

    // Set global config
    (window as any).disqus_config = config;

    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: config,
      });
      return;
    }

    // Check if script already exists but DISQUS is not yet on window
    if (document.getElementById("disqus-script")) return;

    const d = document;
    const s = d.createElement("script");
    s.id = "disqus-script";
    s.src = "https://doosung.disqus.com/embed.js";
    s.setAttribute("data-timestamp", (+new Date()).toString());
    s.async = true;
    (d.head || d.body).appendChild(s);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold mb-8 text-slate-900">댓글 및 커뮤니티</h3>
        <div id="disqus_thread"></div>
        <noscript>
          Please enable JavaScript to view the{" "}
          <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    </div>
  );
}
