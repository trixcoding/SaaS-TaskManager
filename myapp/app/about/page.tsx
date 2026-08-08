import Link from 'next/link';

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <section className="mb-10">
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">

          </Link>

          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-4 mb-3">
            توضیح فنی پروژه
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            درباره این پروژه
          </h1>

          <p className="text-gray-600 leading-relaxed">
            یک Mini SaaS Task Manager که برای نمایش معماری و نحوه‌ی
            پیاده‌سازی یک اپلیکیشن Full-stack واقعی با Next.js، PostgreSQL
            و Prisma ساخته شده است.
          </p>
        </section>

        {/* Why */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            چرا این پروژه را ساختم؟
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            هدف این پروژه ساخت یک Todo App ساده نیست. هدف اصلی، نمایش
            نحوه‌ی پیاده‌سازی یک اپلیکیشن Full-stack واقعی و جریان ارتباط
            بین بخش‌های مختلف سیستم است.
          </p>
          <p className="text-gray-600 leading-relaxed">
            در این پروژه مفاهیمی مانند Authentication، Authorization،
            Server Actions، Validation، ارتباط با Database و بروزرسانی UI
            بعد از تغییر اطلاعات پیاده‌سازی شده‌اند.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            تکنولوژی‌های استفاده‌شده
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Next.js',
              'PostgreSQL',
              'Prisma',
              'Server Actions',
              'Zod',
              'Tailwind CSS',
              'Session Authentication',
            ].map((tech) => (
              <div
                key={tech}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Request Flow */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            جریان اجرای درخواست
          </h2>

          <div className="border border-gray-200 rounded-xl overflow-hidden mb-5">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">مرحله</th>
                  <th className="px-4 py-3 font-medium">چه اتفاقی می‌افته</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-gray-900">درخواست ورودی</td>
                  <td className="px-4 py-3 text-gray-600">Browser → Next.js → Server Component / Server Action</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900">اعتبارسنجی کاربر</td>
                  <td className="px-4 py-3 text-gray-600">Authentication → Validation → Authorization</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900">دیتابیس</td>
                  <td className="px-4 py-3 text-gray-600">Prisma → PostgreSQL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900">به‌روزرسانی UI</td>
                  <td className="px-4 py-3 text-gray-600">revalidatePath() → Updated UI</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 leading-relaxed">
            هر درخواست قبل از تغییر اطلاعات، مراحل Authentication،
            Validation و Authorization را طی می‌کند و سپس از طریق Prisma
            به PostgreSQL متصل می‌شود.
          </p>
        </section>

        {/* Architecture */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            معماری داده
          </h2>

          <div
            dir="ltr"
            className="bg-gray-950 rounded-xl p-6 text-sm leading-8 text-gray-100 overflow-x-auto mb-5"
          >
            <pre>
{`User
 │
 └── Project
       │
       ├── Task
       ├── Task
       └── Task`}
            </pre>
          </div>

          <p className="text-gray-600 leading-relaxed">
            هر Project متعلق به یک User است و هر Task متعلق به یک Project
            است. این رابطه باعث می‌شود بتوانیم دسترسی به منابع را در سطح
            Project و Task کنترل کنیم.
          </p>
        </section>

        {/* Project Flow */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            جریان ساخت Project
          </h2>
          <div className="flex flex-col gap-2.5">
            <FlowStep text="CreateProjectForm" />
            <FlowStep text="createProjectAction()" />
            <FlowStep text="Authentication" />
            <FlowStep text="Zod Validation" />
            <FlowStep text="Authorization" />
            <FlowStep text="Prisma" />
            <FlowStep text="PostgreSQL" />
            <FlowStep text='revalidatePath("/dashboard")' />
            <FlowStep text="بروزرسانی Dashboard" />
          </div>
        </section>

        {/* Task Flow */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            جریان مدیریت Task
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FlowCard
              title="ساخت Task"
              items={['CreateTaskForm', 'createTaskAction()', 'Authentication', 'Validation', 'Authorization', 'Prisma', 'PostgreSQL', 'revalidatePath()']}
            />
            <FlowCard
              title="تغییر وضعیت Task"
              items={['TaskItem', 'useTransition()', 'toggleTaskAction()', 'Authorization', 'Prisma', 'PostgreSQL', 'revalidatePath()']}
            />
            <FlowCard
              title="حذف Task"
              items={['TaskItem', 'deleteTaskAction()', 'Authorization', 'Prisma', 'PostgreSQL', 'revalidatePath()']}
            />
            <FlowCard
              title="نمایش Task"
              items={['ProjectPage', 'Prisma Query', 'PostgreSQL', 'Project + Tasks', 'TaskItem', 'Updated UI']}
            />
          </div>
        </section>

        {/* Authorization */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Authorization و کنترل دسترسی
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            یکی از بخش‌های مهم پروژه جلوگیری از دسترسی کاربران به Project و
            Taskهای کاربران دیگر است.
          </p>

          <div
            dir="ltr"
            className="bg-gray-950 rounded-xl p-6 text-sm leading-7 text-gray-100 overflow-x-auto mb-5"
          >
            <pre>
{`currentUser.id
      +
project.id
      ↓
Database Query
      ↓
Is this project owned
by the current user?
      ↓
 ┌─────────┬─────────┐
 │   YES   │   NO    │
 │    ↓    │    ↓    │
 │ Continue│  Deny   │
 └─────────┴─────────┘`}
            </pre>
          </div>

          <p className="text-gray-600 leading-relaxed">
            بنابراین داشتن شناسه‌ی Project به‌تنهایی برای دسترسی به آن کافی
            نیست و مالکیت Resource نیز بررسی می‌شود.
          </p>
        </section>

        {/* Server / Client */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Server Component و Client Component
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Server Components
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>دریافت اطلاعات از Database</li>
                <li>اجرای Prisma Query</li>
                <li>نمایش Projectها</li>
                <li>نمایش Taskها</li>
                <li>بررسی Authentication</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Client Components
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>تعاملات کاربر</li>
                <li>استفاده از useTransition</li>
                <li>نمایش Pending State</li>
                <li>تغییر وضعیت Task</li>
                <li>حذف Task</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            قابلیت‌های فعلی
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              'ثبت‌نام کاربر', 'ورود کاربر', 'مدیریت Session', 'محافظت از Dashboard',
              'ساخت Project', 'نمایش Projectها', 'حذف Project', 'ساخت Task',
              'نمایش Taskها', 'تغییر وضعیت Task', 'حذف Task', 'Authorization',
              'Server Actions', 'Prisma ORM', 'PostgreSQL', 'Loading UI',
              'Error Boundary', 'Revalidation',
            ].map((feature) => (
              <div
                key={feature}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 flex items-center gap-2"
              >
                <span className="text-blue-600 font-medium">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </section>

        

        <div className="border-t border-gray-100 pt-6">
          <a
            href="https://github.com/trixcoding/SaaSTaskManager"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition text-sm"
          >
            مشاهده‌ی کد کامل روی گیت‌هاب
          </a>
        </div>
      </div>
    </main>
  );
}

function FlowStep({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
      <span dir="ltr" className="font-mono text-sm text-gray-700">
        {text}
      </span>
    </div>
  );
}

function FlowCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h3>
      <div className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-mono text-xs text-gray-400">{index + 1}.</span>
            <code dir="ltr">{item}</code>
          </div>
        ))}
      </div>
    </div>
  );
}