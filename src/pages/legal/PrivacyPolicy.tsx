import LegalPage from '@/components/LegalPage'
import privacy from '@/content/legal/privacy-policy.md?raw'

export default function PrivacyPolicy() {
    return <LegalPage content={privacy} />
}
