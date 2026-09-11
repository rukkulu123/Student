import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export default function Settings() {
  const { user, logout } = useAuth()
  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/app/dashboard' }, { label: 'Settings' }]} />}>
      <div className="max-w-lg space-y-6">
        <Card>
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            <div>
              <p className="text-xs text-ink-faint">Name</p>
              <p className="text-sm text-ink">{user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint">Email</p>
              <p className="text-sm text-ink">{user?.email}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Session</CardTitle></CardHeader>
          <CardBody>
            <Button variant="secondary" onClick={logout}>Log out</Button>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
