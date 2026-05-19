import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, MessageSquare, Briefcase } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  company: z.string().min(1, "회사명을 입력해주세요."),
  subject: z.string().min(1, "문의 주제를 선택해주세요."),
  message: z.string().min(10, "문의 내용을 10자 이상 작성해주세요."),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  theme?: "minimal" | "professional" | "neo";
}

export default function CollaborationForm({ theme = "minimal" }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const getThemeClasses = () => {
    switch (theme) {
      case "professional":
        return {
          container: "bg-white p-10 shadow-2xl border-t-4 border-indigo-600 rounded-lg",
          input: "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100",
          button: "bg-indigo-600 hover:bg-indigo-700 rounded-md",
          label: "text-slate-600 font-semibold mb-1",
          heading: "text-2xl font-serif mb-6 text-slate-800 border-b pb-4"
        };
      case "neo":
        return {
          container: "bg-slate-50 p-10 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none",
          input: "border-2 border-slate-900 focus:ring-0 rounded-none",
          button: "bg-yellow-400 hover:bg-yellow-500 text-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none rounded-none",
          label: "text-slate-900 font-bold mb-1",
          heading: "text-3xl font-black mb-6 uppercase tracking-tighter"
        };
      default: // minimal
        return {
          container: "bg-white p-8 border border-slate-100 shadow-sm rounded-3xl",
          input: "border-slate-100 bg-slate-50/30 focus:bg-white focus:border-slate-900 focus:ring-slate-900/5 rounded-xl",
          button: "bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg",
          label: "text-slate-500 font-medium mb-1",
          heading: "text-2xl font-bold mb-4"
        };
    }
  };

  const styles = getThemeClasses();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/mqejageo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        const result = await response.json();
        setError(result.error || "메시지 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${styles.container} flex flex-col items-center justify-center p-8 text-center space-y-4`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${theme === 'neo' ? 'bg-yellow-400 border-2 border-slate-900' : 'bg-green-50'}`}>
          <CheckCircle2 className={`w-8 h-8 ${theme === 'neo' ? 'text-slate-900' : 'text-green-500'}`} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">문의가 접수되었습니다</h2>
        <p className="text-gray-500 max-w-sm">
          협업 문의를 보내주셔서 감사합니다. <br />
          담당자가 내용을 검토한 후 영업일 기준 48시간 이내에 연락드리겠습니다.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className={`${styles.button} mt-6 px-8 py-2 font-medium text-white transition-all`}
        >
          돌아가기
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.container} space-y-6`}>
        <div className="space-y-1">
          <h2 className={styles.heading}>비즈니스 협업 문의</h2>
          {theme === 'minimal' && (
            <p className="text-slate-400 text-sm">성공적인 파트너십을 위한 첫걸음입니다.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${styles.label}`}>
              {theme === 'minimal' && <User size={14} />} 성함
            </label>
            <input
              {...register("name")}
              className={`w-full px-4 py-2.5 border outline-none transition-all focus:ring-4 ${styles.input} ${
                errors.name ? "border-red-300" : ""
              }`}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${styles.label}`}>
              {theme === 'minimal' && <Mail size={14} />} 이메일
            </label>
            <input
              {...register("email")}
              className={`w-full px-4 py-2.5 border outline-none transition-all focus:ring-4 ${styles.input} ${
                errors.email ? "border-red-300" : ""
              }`}
              placeholder="example@company.com"
            />
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${styles.label}`}>
              {theme === 'minimal' && <Building2 size={14} />} 회사명
            </label>
            <input
              {...register("company")}
              className={`w-full px-4 py-2.5 border outline-none transition-all focus:ring-4 ${styles.input} ${
                errors.company ? "border-red-300" : ""
              }`}
              placeholder="전체 회사명"
            />
            {errors.company && <p className="text-xs text-red-500 font-medium">{errors.company.message}</p>}
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label className={`text-sm flex items-center gap-2 ${styles.label}`}>
              {theme === 'minimal' && <Briefcase size={14} />} 문의 주제
            </label>
            <select
              {...register("subject")}
              className={`w-full px-4 py-2.5 border outline-none transition-all focus:ring-4 ${styles.input} appearance-none bg-no-repeat bg-[right_1rem_center] ${
                errors.subject ? "border-red-300" : ""
              }`}
            >
              <option value="">선택해주세요</option>
              <option value="partnership">전략적 제휴</option>
              <option value="marketing">마케팅 협업</option>
              <option value="investment">투자 문의</option>
              <option value="other">기타</option>
            </select>
            {errors.subject && <p className="text-xs text-red-500 font-medium">{errors.subject.message}</p>}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className={`text-sm flex items-center gap-2 ${styles.label}`}>
            {theme === 'minimal' && <MessageSquare size={14} />} 문의 상세 내용
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className={`w-full px-4 py-2.5 border outline-none transition-all focus:ring-4 resize-none ${styles.input} ${
              errors.message ? "border-red-300" : ""
            }`}
            placeholder="협업 제안 내용을 자유롭게 작성해 주세요."
          />
          {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 p-4 text-red-700 border ${theme === 'neo' ? 'bg-red-100 border-slate-900 rounded-none' : 'bg-red-50 border-red-100 rounded-xl'}`}
          >
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
        >
          {isSubmitting ? (
            <div className={`w-5 h-5 border-2 rounded-full animate-spin ${theme === 'neo' ? 'border-slate-900 border-t-white' : 'border-white/30 border-t-white'}`} />
          ) : (
            <>
              문의 보내기 <Send size={18} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 font-medium">
          전송 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
        </p>
      </form>
    </div>
  );
}
