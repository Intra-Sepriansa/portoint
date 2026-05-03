<x-mail::message>
# Pesan portofolio baru

**Nama:** {{ $messageData['name'] }}

**Email:** [{{ $messageData['contactEmail'] }}](mailto:{{ $messageData['contactEmail'] }})

## Pesan

{!! nl2br(e($messageData['message'])) !!}

<x-mail::button :url="'mailto:'.$messageData['contactEmail']">
Balas {{ $messageData['name'] }}
</x-mail::button>

Terima kasih,<br>
{{ config('app.name') }}
</x-mail::message>
