// <div className={styles.pagination}>
//             {Array.from({ length: state.maxPage }, (_, i) => i + 1).map((elem) => (
//               <li key={elem}>
//                 <NavLink
//                   to={`?q=${searchParams.get('q') || ''}&page=${elem}`}
//                   className={
//                     +(searchParams.get('page') || 1) === elem
//                       ? `${styles.pagination_btn} ${styles.active}`
//                       : `${styles.pagination_btn}`
//                   }
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleStateLoader();
//                   }}
//                 >
//                   {elem}
//                 </NavLink>
//               </li>
//             ))}
//           </div>
