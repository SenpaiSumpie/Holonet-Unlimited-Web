import SetsForm from '@/modules/card-management/components/sets-form';

export default function SetsPage({
    searchParams
}: {
    searchParams?: { id?: string };
}) {
    const id = searchParams?.id;

    return <SetsForm setId={id ?? ''} />;
}
