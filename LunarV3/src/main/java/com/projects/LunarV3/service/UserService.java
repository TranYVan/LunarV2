package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Role;
import com.projects.LunarV3.domain.model.RoleName;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.repository.RoleRepository;
import com.projects.LunarV3.repository.UserRepository;
import com.projects.LunarV3.utils.JsonPage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    public Page<User> findAll(int pageNumber, int pageSize, String sortColumn, boolean isAscending) {
        Pageable pageable = isAscending ?
                PageRequest.of(pageNumber, pageSize, Sort.by(sortColumn).ascending()) :
                PageRequest.of(pageNumber, pageSize, Sort.by(sortColumn).descending());

        return new JsonPage<User>(userRepository.findAll(pageable), pageable);
    }

    public User save(User user) {
        Set<Role> roleSet = getRoleSet(user);

        user.setRoles(roleSet);
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User partialUpdate(Long id, User user) {
        user.setId(id);
        System.out.println("user:: " + user);
        Set<Role> roleSet = getRoleSet(user);

        user.setRoles(roleSet);
        return userRepository.findById(id).map(existingUser -> {

            Optional.ofNullable(user.getPassword()).ifPresent(existingUser::setPassword);
            Optional.ofNullable(user.getFullName()).ifPresent(existingUser::setFullName);
            Optional.ofNullable(user.getBirthday()).ifPresent(existingUser::setBirthday);
            Optional.ofNullable(user.getAvatar()).ifPresent(existingUser::setAvatar);
            Optional.ofNullable(user.getPhone()).ifPresent(existingUser::setPhone);
            Optional.ofNullable(user.getRoles()).ifPresent(existingUser::setRoles);

            System.out.println("Existing User: " + existingUser);
            return userRepository.save(existingUser);

        }).orElseThrow(() -> new RuntimeException("User does not exist"));
    }

    private Set<Role> getRoleSet(User user) {
        Set<Role> roles = user.getRoles();
        Set<Role> roleSet = new HashSet<>();

        roles.forEach((role) -> {
            Optional<Role> fetchedRole = null;

            if (role.getId() != null) {
                fetchedRole = roleRepository.findById(role.getId());
            } else if ( role.getName() != null) {
                fetchedRole = roleRepository.findByName(role.getName());
            }

            if (fetchedRole.isPresent()) {
                roleSet.add(fetchedRole.get());
            }

            System.out.println(role);
        });
        return roleSet;
    }

    public Optional<User> getUserByEmail(String email) {
        System.out.println("EMAIL: " + email);
        System.out.println(userRepository.findByEmail(email));
        return userRepository.findByEmail(email);
    }

    public boolean isUserExists(Long id) {
        return userRepository.existsById(id);
    }

//    public void addRole(Role role, User user) {
//        userRepository
//    }
}
