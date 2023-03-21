import { ButtonBase } from '@mui/material';
import { Box } from '@mui/system';

export default function SideNavItem(props) {
  const { active = false, icon, title, path, onClick } = props;

  return (
    <li>
      <ButtonBase
        onClick={() => onClick(path)}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
      >
        {icon && (
          <Box
            component='span'
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main',
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component='span'
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
}
