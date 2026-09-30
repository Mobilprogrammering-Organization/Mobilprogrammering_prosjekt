import { render, screen } from '@testing-library/react-native';
import Index from '@/app/(tabs)/index';

test('Games render correctly', async () => {
  await render(<Index />);

  expect(screen.getByText('Title: Game 1')).toBeOnTheScreen();
  expect(screen.getByText('Title: Game 2')).toBeOnTheScreen();
  expect(screen.getByText('Title: Game 3')).toBeOnTheScreen();
});