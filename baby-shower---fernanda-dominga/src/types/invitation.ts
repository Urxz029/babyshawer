export interface InvitationData {
  babyName: string;
  invitedHeading: string;
  eventType: string;
  celebratingText: string;
  message: string;
  dateText: string;
  timeText: string;
  venueAddress: string;
  rsvpPhone: string;
  closingText: string;
}

export const DEFAULT_INVITATION: InvitationData = {
  babyName: 'Fernanda',
  invitedHeading: 'Estás invitado/a a mi',
  eventType: 'Baby Shower',
  celebratingText: 'para celebrar la llegada de',
  message:
    'Será un día muy especial y me encantaría que me acompañaras en este momento tan importante para mi familia.',
  dateText: 'Sábado 7 de noviembre',
  timeText: '18:00 hrs.',
  venueAddress: 'Los Olmecas 10857, La Pintana',
  rsvpPhone: '+56940020123',
  closingText: '¡Te espero!',
};

export interface GuestRsvp {
  name: string;
  attendance: 'yes' | 'no';
  guestsCount: number;
  message: string;
  timestamp: string;
}
