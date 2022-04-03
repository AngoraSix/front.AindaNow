// import React from 'react';
// import PropTypes from 'prop-types';
// import { Box, Paper, Typography, Avatar } from '@mui/material';
// import Editable from '../../common/Editable';
// import { PROFILE_ATTRIBUTES } from '../../../constants';
// import { INPUT_FIELD_TYPES } from '../../../constants';
// import { useTheme } from '@mui/styles';

// const ProjectPresentation = ({
//   project,
// }) => {

//   return (
//     <Paper className="Presentation">
//       <Box className="Profile__Editable__Container Presentation__HeadImageContainer">
//         <Editable
//           type={INPUT_FIELD_TYPES.IMAGE}
//           isEditable={isCurrentContributor}
//           fieldName={PROFILE_ATTRIBUTES.headImage.label}
//           onEdit={onEdit(PROFILE_ATTRIBUTES.headImage.key, true)}
//         >
//           <Box
//             className="Presentation__HeadImage"
//             style={{
//               backgroundImage: `url(${getAttributeValue(
//                 PROFILE_ATTRIBUTES.headImage.key
//               )}), url(${getAttributeValue(
//                 PROFILE_ATTRIBUTES.headImageThumbnail.key
//               )}) `,
//               backgroundColor: theme.palette.primary.main,
//             }}
//           ></Box>
//         </Editable>
//       </Box>
//       <Box className="Profile__Editable__Container Presentation__ProfileImageContainer">
//         <Editable
//           type={INPUT_FIELD_TYPES.IMAGE}
//           isEditable={isCurrentContributor}
//           fieldName={PROFILE_ATTRIBUTES.profilePicture.label}
//           onEdit={onEdit(PROFILE_ATTRIBUTES.profilePicture.key, true)}
//         >
//           <Box className={'Presentation__ProfileImage'}>
//             <Avatar
//               src={
//                 getAttributeValue(
//                   PROFILE_ATTRIBUTES.profilePictureThumbnail.key
//                 ) || getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)
//               }
//               sx={{ width: '100%', height: '100%' }}
//             ></Avatar>
//           </Box>
//         </Editable>
//       </Box>

//       <Box className="Presentation__ContributorData">
//         <Typography
//           className="ContributorData__Name"
//           variant="h5"
//         >{`${profile.firstName} ${profile.lastName}`}</Typography>
//       </Box>
//     </Paper>
//   );
// };

// ProjectPresentation.defaultProps = {
//   profileAttributes: {},
// };

// ProjectPresentation.propTypes = {
//   profile: PropTypes.object.isRequired,
//   profileAttributes: PropTypes.object,
//   onEditField: PropTypes.func.isRequired,
// };

// export default ProjectPresentation;
